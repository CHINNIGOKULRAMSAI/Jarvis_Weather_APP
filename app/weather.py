import requests
from dotenv import load_dotenv
import os

load_dotenv()

APP_KEY = os.getenv("OPENWEATHER_API_KEY")

BASE_URL = "https://api.openweathermap.org/data/2.5"

def get_current_weather(city: str):
    url = f"{BASE_URL}/weather"
    params = {
        'q':city,
        'appid':APP_KEY,
        'units':'metric'
    }
    response = requests.get(url, params=params)
    return response.json()

def get_current_forecast(city:str):
    url = f"{BASE_URL}/forecast"
    params = {
        'q':city,
        'appid':APP_KEY,
        'units':'metric'
    }
    response = requests.get(url, params=params)
    return response.json()