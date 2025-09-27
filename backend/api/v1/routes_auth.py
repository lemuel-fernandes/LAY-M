from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, validator
from db.db import users_collection
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
import os
import hashlib
import bcrypt
from models.Users import UserModel
from dotenv import load_dotenv

SECRET_KEY = os.getenv("JWT_SECRET", "supersecretkey")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

try:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    USE_PASSLIB = True
except Exception as e:
    print(f"Passlib bcrypt issue: {e}")
    USE_PASSLIB = False

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


class UserLogin(BaseModel):
    email: EmailStr
    password: str

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def hash_password(password: str) -> str:

    password_bytes = password.encode('utf-8')
    
    if len(password_bytes) > 72:
        password = hashlib.sha256(password_bytes).hexdigest()
        password_bytes = password.encode('utf-8')
    
    if USE_PASSLIB:
        try:
            return pwd_context.hash(password)
        except Exception as e:
            print(f"Passlib error, falling back to direct bcrypt: {e}")
            pass
    
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify password with bcrypt, handling length limitations and version issues.
    """
    password_bytes = plain_password.encode('utf-8')
    
    if len(password_bytes) > 72:
        plain_password = hashlib.sha256(password_bytes).hexdigest()
        password_bytes = plain_password.encode('utf-8')
    
    if USE_PASSLIB:
        try:
            return pwd_context.verify(plain_password, hashed_password)
        except Exception as e:
            print(f"Passlib error, falling back to direct bcrypt: {e}")
            pass
    
    try:
        return bcrypt.checkpw(password_bytes, hashed_password.encode('utf-8'))
    except Exception:
        return False

@router.get('/status')
def auth_status():
    return {"status": "Authentication service is running"}

@router.post("/register")
async def register(user: UserModel):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Use the custom hash_password function
    hashed_pw = hash_password(user.password)
    print("Password hashed successfully")

    user_dict = user.dict(by_alias=True)
    user_dict["password"] = hashed_pw 
    user_dict.pop("_id", None)
    
    await users_collection.insert_one(user_dict)
    
    return {"msg": "User registered successfully"}

@router.post("/login")
async def login(user: UserLogin):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}