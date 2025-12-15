from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from app.weather import get_current_forecast,get_current_weather

app = FastAPI()

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/weather/{city}")
def weather(city: str):
    current = get_current_weather(city)
    forecast = get_current_forecast(city)

    return {
        "city": current["name"],
        "temperature": current["main"]["temp"],
        "humidity": current["main"]["humidity"],
        "description": current["weather"][0]["description"],
        "forecast": forecast["list"][:8]
    }
