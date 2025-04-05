import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ buttonCities, onCityClick, selectedButtonCity }) => {
  return (
    <div>
      <div className="weather-button-wrap">
        {buttonCities.map((city) => (
          <Button
            className="weather-button"
            key={city}
            onClick={() => onCityClick(city)}
            variant={selectedButtonCity === city ? "light" : "dark"}
          >
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
