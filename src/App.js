import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";

function App() {
  const [weather, setWeather] = useState(null);
  const getCurrentLocation = () => {
    // console.log("getCurrentLocation");
    navigator.geolocation.getCurrentPosition(success);
  };

  const success = (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    // console.log("현재 위치", lat, lon);

    getWeatherByCurrentLocation(lat, lon);
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3b56745dd240621d3eaad2aac3d8a827&units=metric`;
    let response = await fetch(url); // 비동기
    let data = await response.json();
    // console.log("data", data);
    setWeather(data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      <div className="container">
        <WeatherBox weather={weather} />
        <WeatherButton />
      </div>
    </div>
  );
}

export default App;
