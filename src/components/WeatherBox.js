import React from "react";

const WeatherBox = ({ weather }) => {
  console.log("weather", weather);
  return (
    <div className="weather-box">
      {/* <h2>{weather && weather.name}</h2> */}
      <h2>{weather?.name}</h2>
      <p>
        {Math.floor(weather?.main.temp)}°C/{" "}
        {Math.floor(weather?.main.temp * 1.8 + 32)}°F
      </p>
      <p>{weather?.weather[0].description}</p>
    </div>
  );
};

export default WeatherBox;
