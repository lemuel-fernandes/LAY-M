from fastapi import APIRouter, Depends

router = APIRouter()

@router.get('/api/v1/auth/status')
def auth_status():
    return {"status": "Authentication service is running"}

@router.post('/api/v1/auth/register')
def register_user():
    return {"message": "User registration endpoint"}

@router.post('/api/v1/auth/login')
def login_user():
    return {"message": "User login endpoint"}