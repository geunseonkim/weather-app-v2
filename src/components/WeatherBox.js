import React from "react";

const WeatherBox = ({ weather, city, myLocation }) => {
  //   console.log("weather", weather);
  return (
    <div className="weather-box">
      <div className="weather-box-left">
        {/* <h2>{weather && weather.name}</h2> */}
        <div>
          <h2>{weather?.name || city}</h2>
          {/* <h6>{weather?.sys.country}</h6> */}

          {myLocation ? (
            <h6>
              <span>My Location • </span>
              {weather?.sys.country}
            </h6>
          ) : (
            <h6>{weather?.sys.country}</h6>
          )}
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div>
          <h6>{weather?.weather[0].description}</h6>
        </div>
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <div className="weather-box-right">
        <div>
          <h2>
            {Math.floor(weather?.main.temp)}°
            {/* {Math.floor(weather?.main.temp * 1.8 + 32)}°F */}
          </h2>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div>
          <h6>
            L: {Math.floor(weather?.main.temp_max)}° {""}H:{" "}
            {Math.floor(weather?.main.temp_min)}°
          </h6>
        </div>
      </div>
    </div>
  );
};

export default WeatherBox;
