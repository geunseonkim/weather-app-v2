import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ buttonCities, onCityClick, cityWeather }) => {
  return (
    <div>
      <div className="weather-button-wrap">
        {buttonCities.map((city) => (
          <Button
            className="weather-button"
            key={city}
            onClick={() => onCityClick(city)}
            variant={cityWeather[city] ? "light" : "dark"}
            disabled={cityWeather[city]}
          >
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
