import React from "react";

const Forecast = ({ forecast }) => {
  return (
    <div className="forecast grid grid-cols-3   gap-[0.4vw] p-[0.83vw]   mt-[10vh] text-center ">
      {forecast.map((day) => (
        <div
          key={day.date}
          className=" bg-[rgba(0,0,0,0.1)] text-white rounded-md p-[0.41vw] shadow-lg hover:bg-[rgba(0,0,0,0.4)] transition-all  ease-in-out duration-100"
        >
          <h3 className="text-center text-[1.4vw] font-bold ">
            {new Date(day.date).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </h3>

          <p className="text-gray-300 text-[1.04vw] mt-1">
            {day.day.condition.text}
          </p>
          <p className="text-[0.93vw] mt-1">
            Max Temp: {Math.round(day.day.maxtemp_c)}°C
          </p>
          <p className="text-[0.93vw] mt-1">
            Min Temp: {Math.round(day.day.mintemp_c)}°C
          </p>
          <p className="text-[0.93vw] mt-1">
            Humidity: {Math.round(day.day.avghumidity)}%
          </p>
          <p className="flex justify-center">
            <img src={day.day.condition.icon} className="w-[2.5vw]" />
          </p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
