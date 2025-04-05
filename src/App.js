import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
const cities = ["Wellington", "Christchurch"];
const buttonCities = ["Sydney", "Melbourne"];

function App() {
  const [weather, setWeather] = useState(null);
  const [cityWeather, setCityWeather] = useState({});
  // const [openedCard, setOpenedCard] = useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedButtonCity, setSelectedButtonCity] = useState(null);
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
    // console.log("getCurrentLocation");
    navigator.geolocation.getCurrentPosition(success, error);
  }, [success, error]);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url); // 비동기
      let data = await response.json();
      // console.log("data", data);
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
      // console.log("data", data);
      setCityWeather((prev) => ({ ...prev, [city]: data }));
      setLoading(false);
    } catch (error) {
      setApiError(error.message);
      setLoading(false);
    }
  };

  // const getWeatherByCity = async (city) => {
  //   if (cityWeather[city]) {
  //     console.log("city", city);
  //     setOpenedCard((prev) => (prev === city ? null : city));
  //     return;
  //   }

  //   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3b56745dd240621d3eaad2aac3d8a827&units=metric`;
  //   let response = await fetch(url);
  //   let data = await response.json();
  //   console.log("data", data);
  //   setCityWeather((prev) => ({ ...prev, [city]: data }));
  //   setOpenedCard(city);
  // };

  const handleCityClick = (city) => {
    setSelectedButtonCity((prev) => (prev === city ? null : city));
    getWeatherByCity(city);
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
              {/* 버튼 안 쓰려고 먼저 만들었지만 결국 중복 코드.
  {cities.map((city) => (
    <div key={city}>
      <WeatherBox weather={cityWeather[city]} city={city} />
    </div>
  ))} */}
              {/* 카드를 눌렀을 때만 데이터가 뜸. 다른 도시의 데이터를 확인하면 이전 도시 데이터를 볼 수 없음.
  {cities.map((city) => (
    <div key={city} onClick={() => getWeatherByCity(city)}>
      <WeatherBox
        weather={openedCard === city ? cityWeather[city] : null}
        city={city}
      />
    </div>
  ))} */}
              {Object.entries(cityWeather).map(([city, weather]) => (
                <WeatherBox key={city} weather={weather} title={city} />
              ))}

              <WeatherButton
                buttonCities={buttonCities}
                onCityClick={handleCityClick}
                selectedButtonCity={selectedButtonCity}
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
