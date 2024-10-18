from flask import Flask, render_template, request, jsonify
import requests
from geopy.geocoders import Nominatim
from timezonefinder import TimezoneFinder
import pytz
from datetime import datetime

app = Flask(__name__)

API_KEY = '9d2e0141c090e7e22e4ed81363af4af6'  # Your actual API key

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    unit = request.args.get('unit', 'metric')

    try:
        # Geolocation API
        geolocator = Nominatim(user_agent="geoapiExercises")
        location = geolocator.geocode(city)
        if not location:
            return jsonify({"error": "City not found."}), 404

        # Weather API
        weather_api = f"http://api.openweathermap.org/data/2.5/weather?lat={location.latitude}&lon={location.longitude}&appid={API_KEY}&units={unit}"
        weather_data = requests.get(weather_api).json()

        if weather_data['cod'] != 200:
            return jsonify({"error": weather_data['message']}), 404

        return jsonify({
            "temperature": weather_data['main']['temp'],
            "condition": weather_data['weather'][0]['main'],
            "description": weather_data['weather'][0]['description'],
            "humidity": weather_data['main']['humidity'],
            "wind": weather_data['wind']['speed'],
            "pressure": weather_data['main']['pressure'],
            "icon": weather_data['weather'][0]['icon']
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
