# FastAPI Project

This project uses FastAPI as the web framework, uvicorn as the WSGI server, and SQLite as the database.

## Requirements

* Python 3.11
* FastAPI
* uvicorn
* SQLAlchemy
* Pydantic

## Setup

1. Install the required packages: `pip install -r requirements.txt`
2. Run the application: `uvicorn app.main:app --host 0.0.0.0 --port 8000`

## Endpoints

* `/health`: Returns a health check message
* `/auth/login`: Authenticates a user and returns an access token
* `/weather`: Returns the current weather data
