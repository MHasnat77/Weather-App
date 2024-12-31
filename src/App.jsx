import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import clearSky from "./assets/clearsky.jpg";
import drizzle from "./assets/drizzle.jpg";
import rain from "./assets/rain.jpg";
import overCast from "./assets/overcast.jpg";
import mist from "./assets/mist.jpg";
import showerRain from "./assets/showerrain.jpg";
import snow from "./assets/snow.jpg";
import thunderStorm from "./assets/thunderstorm.jpg";
import fewClouds from "./assets/fewclouds.jpg";
import smoke from "./assets/smoke.jpg";
import Weather from "./components/weather";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  const weatherKey = "0f481da472aee275b27033b57ae748ed";
  const forecastKey = "18f37daa212046ea94262709242412";

  const getWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherKey}`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data, Please try again.");
    }
  };

  const getForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${forecastKey}&q=Lahore&days=7&aqi=no&alerts=no`
      );
      setForecast(response.data.forecast.forecastday);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data, Please try again.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getWeather(latitude, longitude);
        },
        () => {
          setError("Please allow location access to fetch weather data.");
        }
      );
    } else {
      setError("Couldn't get the user location.");
    }
    getForecast();
  }, []);

  useEffect(() => {
    if (weather) {
      const description = weather.weather?.[0]?.description.toLowerCase();

      const weatherImages = {
        "clear sky": clearSky,
        drizzle: drizzle,
        rain: rain,
        "few clouds": fewClouds,
        snow: snow,
        "overcast clouds": overCast,
        thunderstorm: thunderStorm,
        mist: mist,
        "shower rain": showerRain,
        smoke: smoke,
      };

      const matchingImage = Object.keys(weatherImages).find((key) =>
        description.includes(key)
      );

      setBackgroundImage(weatherImages[matchingImage]);
    }
  }, [weather]);

  return (
    <div
      className="app bg-cover bg-no-repeat  min-h-screen w-full m-0 p-0 text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {error && <div className="error">{error}</div>}
      {weather && <Weather weather={weather} forecast={forecast} />}
    </div>
  );
};

export default App;