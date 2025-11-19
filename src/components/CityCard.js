import React, { useState, useEffect } from 'react';
import './CityCard.css';

const CityCard = ({ cityData }) => {
  const [currentTime, setCurrentTime] = useState(cityData.time.time || '00:00:00');
  console.log("City Data: ", cityData);
  
  useEffect(() => {
    // Update clock every second
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleString('en-US', {
        timeZone: cityData.time.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(timeString);
    }, 1000);

    return () => clearInterval(interval);
  }, [cityData.time.timezone]);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (timezone) => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="city-card">
      <div className="city-header">
        <h2>{cityData.time.city}</h2>
        <p className="country">{cityData.time.country}</p>
      </div>

      <div className="clock-section">
        <div className="clock">
          {currentTime.split(':').map((part, index) => (
            <span key={index} className="clock-digit">
              {part}
            </span>
          ))}
        </div>
        <p className="date">{formatDate(cityData.time.timezone)}</p>
        <p className="timezone">{cityData.time.timezone}</p>
      </div>

      <div className="weather-section">
        <div className="weather-main">
          {cityData.weather.icon && (
            <img
              src={getWeatherIcon(cityData.weather.icon)}
              alt={cityData.weather.description}
              className="weather-icon"
            />
          )}
          <div className="temperature">
            <span className="temp-value">{cityData.weather.temperature}°</span>
            <span className="temp-unit">C</span>
          </div>
        </div>
        <p className="weather-description">
          {cityData.weather.description?.charAt(0).toUpperCase() + 
           cityData.weather.description?.slice(1)}
        </p>
        <div className="weather-details">
          <div className="weather-detail-item">
            <span className="detail-label">Feels like</span>
            <span className="detail-value">{cityData.weather.feelsLike}°C</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{cityData.weather.humidity}%</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{cityData.weather.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;

