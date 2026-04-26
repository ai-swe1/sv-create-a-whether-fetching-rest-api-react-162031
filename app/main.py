import os
import sqlite3
import json
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from app.routers import weather, auth
from app.models import User
from app.schemas import UserLogin, TokenResponse, WeatherResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get("/health")
async def health_check():
    return {"message": "Service is healthy"}

app.include_router(weather.router)
app.include_router(auth.router)

class User(BaseModel):
    id: int
    name: str

class UserLogin(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str

class WeatherResponse(BaseModel):
    temperature: float
    humidity: float

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)