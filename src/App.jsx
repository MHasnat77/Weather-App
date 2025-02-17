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
import ScatteredClouds from "./assets/ScatteredClouds.jpg";
import Fog from "./assets/Fog.jpg";
import Haze from "./assets/haze.jpg";
import Weather from "./components/weather";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    } finally {
      setIsLoading(false);
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
          setIsLoading(false);
        }
      );
    } else {
      setError("Couldn't get the user location.");
      setIsLoading(false);
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
        "scattered clouds": ScatteredClouds,
        fog: Fog,
        haze: Haze,
      };

      const matchingImage = Object.keys(weatherImages).find((key) =>
        description.includes(key)
      );

      setBackgroundImage(weatherImages[matchingImage]);
    }
  }, [weather]);

  return (
    <div
      className="app bg-cover bg-no-repeat min-h-screen w-full m-0 p-0 text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-50">
          <div className="text-center">
            {/* Enhanced Tailwind Spinner */}
            <div
              className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-transparent border-t-[#3B82F6] border-r-[#3B82F6] border-b-[#3B82F6] border-l-[#3B82F6] bg-gradient-to-r from-[#3B82F6] to-[#9333EA] align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-4 text-lg text-white font-medium">
              Please allow GPS access to see the current weather.
            </p>
          </div>
        </div>
      ) : (
        <>
          {error && <div className="error">{error}</div>}
          {weather && <Weather weather={weather} forecast={forecast} />}
        </>
      )}
    </div>
  );
};

export default App;
