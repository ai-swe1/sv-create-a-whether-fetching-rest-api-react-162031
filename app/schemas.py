from pydantic import BaseModel
from typing import Optional

class UserLogin(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str

class WeatherResponse(BaseModel):
    temperature: float
    humidity: float
