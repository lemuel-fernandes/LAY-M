from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, protected_paths=None):
        super().__init__(app)
        self.protected_paths = protected_paths or []

    async def dispatch(self, request: Request, call_next):
        path = request.url.path

        if not any(path.startswith(p) for p in self.protected_paths):
            return await call_next(request)

        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse(status_code=401, content={"detail": "Unauthorized: Missing or invalid Authorization header"})

        token = auth_header[len("Bearer "):].strip()
        if token != "secrettoken123":
            return JSONResponse(status_code=401, content={"detail": "Unauthorized: Invalid token"})

        return await call_next(request)
