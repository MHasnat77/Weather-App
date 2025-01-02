import React from "react";
import Date from "./Date";
import Forecast from "./forecast";

const Weather = ({ weather, forecast }) => {
  return (
    <>
      {/*Weather Side Bar */}
      <div className="flex">
        <div className=" border-[0.5px] rounded-r-md border-[rgba(0,0,0,0.1)] w-[19.531vw] h-screen relative z-40 bg-[rgba(0,0,0,0.1)]">
          <div className="text-center">
            <div className=" flex mt-[4vh] justify-center mb-[4vh] mx-[1vw] text-white ">
              <i className="fas fa-thermometer-half text-white-500 mt-[9px] text-[1.563vw] mx-[0.5vw] "></i>

              <h3 className="cursor-pointer text-[1.563vw] text-white ">
                {weather.name + ", " + weather.sys?.country}
              </h3>
            </div>
            <div className="text-[3vw] py-[0.417vw]">
              {Math.round(weather.main?.temp)}°{" "}
              <i className="fa-solid fa-plus-minus text-slate-400 mx-[2%] text-[1.5vw]"></i>{" "}
              {Math.round(weather.main?.temp - weather.main?.feels_like)}
            </div>

            <div className="flex items-center text-center justify-center py-[0.417vw]">
              <img
                className="mx-[0.26vw]"
                src={`http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
                alt="weather-icon"
              />
              <h1 className="text-[1.5vw] mx-[1%]">
                {weather.main?.humidity}%
              </h1>
              <h1 className="text-[.95vw] mx-[2%]">
                Wind: WSW {weather.wind.speed} mph
              </h1>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="w-[80%] mt-[10vh] ">
          <h4 className="text-[3.5vw]  text-gray-600   w-[20vw] justify-center items-center mx-[30vw] drop-shadow-xl outline-4">
            {weather.weather?.[0]?.description.toLocaleUpperCase()}
          </h4>
          <h4 className="text-[1.5vw] bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#B0C4DE] flex ml-[13vw] mt-[3vw] drop-shadow-lg font-medium">
            {weather.sys?.country}, <Date />
          </h4>

          <div className="flex ml-[13vw] mt-[0.3vw] w-[40vw] h-[15vh] mb-[0.5vh] bg-[rgba(0,0,0,0.1)]">
            <p className="text-[3vw] border-r-[0.208vw] px-[0.3vw] mx-[0.35vw] italic">
              {Math.round(weather.main?.temp)}°
            </p>
            <div className="w-[20vw]">
              <p className="text-[1.042vw] ml-[0.156vw]">
                The air pressure is currently at{" "}
                <strong>{weather.main?.pressure}hPa</strong>, visibility at{" "}
                <strong>{weather.visibility}m</strong>, and feels like
                temperature of{" "}
                <strong>{Math.round(weather.main?.feels_like)}°</strong>.
                Today's temperatures range from{" "}
                <strong>{Math.round(weather.main?.temp_min)}°</strong> to{" "}
                <strong>{Math.round(weather.main?.temp_max)}°</strong>.
              </p>
            </div>
          </div>
          <h4 className="text-[3.5vw] text-gray-600  w-[40vw] justify-center items-center mx-[30vw] drop-shadow-xl outline-5">
            Weekly Forecast
          </h4>
          {/* Forecast Deatils */}
          <Forecast forecast={forecast} />
        </div>
      </div>
    </>
  );
};

export default Weather;
