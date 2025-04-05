import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
const cities = ["Wellington"];
const buttonCities = ["Christchurch", "Sydney", "Melbourne"];

function App() {
  const [weather, setWeather] = useState(null);
  const [cityWeather, setCityWeather] = useState({});
  const [myLocation, setMyLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const success = useCallback((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    // console.log("현재 위치", lat, lon);
    getWeatherByCurrentLocation(lat, lon);
  }, []);

  const error = useCallback((error) => {
    console.log("location info error", error.message);
  }, []);

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, [success, error]);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setMyLocation(data.name);
      setLoading(false);
    } catch (error) {
      setApiError(error.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async (city) => {
    try {
      if (cityWeather[city]) return;
      setLoading(true);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      setCityWeather((prev) => ({ ...prev, [city]: data }));
      setLoading(false);
    } catch (error) {
      setApiError(error.message);
      setLoading(false);
    }
  };

  const handleCityClick = (city) => {
    if (cityWeather[city]) {
      setCityWeather((prev) => {
        const { [city]: cityInfo, ...newCityWeather } = prev;
        return newCityWeather;
      });
    } else {
      getWeatherByCity(city);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    cities.forEach((city) => {
      getWeatherByCity(city);
    });
  }, [getCurrentLocation]);

  return (
    <div>
      {loading ? (
        <div
          className="containerr"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <ClipLoader color="#3525c8" loading={loading} size={150} />
        </div>
      ) : !apiError ? (
        <div className="containerr">
          <div>
            <h1>Weather</h1>
          </div>
          <div className="container-contents">
            <div>
              <p>
                <span>💡</span> Click a city to view the weather
              </p>
            </div>
            <div>
              <WeatherBox weather={weather} myLocation={myLocation} />

              {Object.entries(cityWeather).map(([city, weather]) => (
                <WeatherBox key={city} weather={weather} title={city} />
              ))}

              <WeatherButton
                buttonCities={buttonCities}
                onCityClick={handleCityClick}
                cityWeather={cityWeather}
              />
            </div>
          </div>
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
