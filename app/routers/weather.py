from fastapi import APIRouter, HTTPException
from app.schemas import WeatherResponse

router = APIRouter()

@router.get("/weather")
async def get_weather():
    try:
        # Simulating a weather API call
        weather_data = {"temperature": 25.0, "humidity": 60.0}
        return WeatherResponse(**weather_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))