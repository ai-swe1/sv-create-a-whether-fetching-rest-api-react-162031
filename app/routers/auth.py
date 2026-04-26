from fastapi import APIRouter, HTTPException
from app.schemas import UserLogin, TokenResponse
from app.models import User

router = APIRouter()

@router.post("/auth/login")
async def login(user: UserLogin):
    try:
        # Simulating a user authentication
        user_data = User(id=1, name="John Doe")
        access_token = "dummy_access_token"
        return TokenResponse(access_token=access_token)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))