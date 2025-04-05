import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({
  buttonCities,
  onCityClick,
  selectedButtonCity,
  cityWeather,
}) => {
  return (
    <div>
      <div className="weather-button-wrap">
        {buttonCities.map((city) => (
          <Button
            className="weather-button"
            key={city}
            onClick={() => onCityClick(city)}
            variant={
              Object.keys(cityWeather).includes(city)
                ? "dark"
                : selectedButtonCity === city
                ? "light"
                : "dark"
            }
            disabled={Object.keys(cityWeather).includes(city)}
          >
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
