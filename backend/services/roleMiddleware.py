from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from jose import jwt, JWTError
from typing import List
from models.Users import RoleEnum
from dotenv import load_dotenv
import os
load_dotenv()
# Your JWT config (adjust accordingly)
SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"

class RoleMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, protected_paths_roles: dict = None):
        """
        protected_paths_roles: dict where key = path prefix,
        value = list of RoleEnum values (strings) required to access that path
        e.g. {"/admin": ["event_manager"], "/events": ["event_manager", "event_staff"]}
        """
        super().__init__(app)
        self.protected_paths_roles = protected_paths_roles or {}

    async def dispatch(self, request: Request, call_next):
        path = request.url.path

        required_roles: List[RoleEnum] = []
        for prefix, roles in self.protected_paths_roles.items():
            if path.startswith(prefix):
                required_roles = roles
                break

        if not required_roles:
            return await call_next(request)

        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=401,
                content={"detail": "Unauthorized: Missing or invalid Authorization header"},
            )

        token = auth_header[len("Bearer "):].strip()

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_roles = payload.get("roles", [])
            if not isinstance(user_roles, list):
                user_roles = []
        except JWTError:
            return JSONResponse(
                status_code=401,
                content={"detail": "Unauthorized: Invalid token"},
            )

        # Check for role intersection
        if not any(role in user_roles for role in required_roles):
            return JSONResponse(
                status_code=403,
                content={"detail": "Forbidden: You do not have permission to access this resource"},
            )

        # Authorized, proceed with the request
        return await call_next(request)
