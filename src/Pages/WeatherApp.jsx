import React, { useState, useEffect } from "react";
// import WeatherGraph from "./WeatherGraph";
// import WeatherSummary from "./WeatherSummary";

const API_KEY = "your_api_key_here";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const successCallback = async (position) => {
      const { latitude, longitude } = position.coords;
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      (error) => setError(error.message),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 justify-items-center">
      <h1 className="text-3xl font-bold">Current Weather</h1>
      <div>
        <p className="text-2xl font-bold">
          {weatherData.name}, {weatherData.sys.country}
        </p>
        <p className="text-lg">
          {weatherData.weather[0].description} -{" "}
          {Math.round(weatherData.main.temp)}°C
        </p>
        <p className="text-lg">
          Wind: {Math.round(weatherData.wind.speed)} m/s {weatherData.wind.deg}°
        </p>
        <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
        <p className="text-lg">
          Rain: {weatherData.rain ? `${weatherData.rain["1h"]} mm/h` : "0 mm/h"}
        </p>
      </div>
      {/* <WeatherGraph />
      <WeatherSummary /> */}
    </div>
  );
};

export default WeatherApp;
