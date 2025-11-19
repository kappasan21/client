import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CityCard from './components/CityCard';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5101';
const EXCHANGE_RATES_URL = process.env.REACT_APP_EXCHANGE_RATES_URL || 'http://localhost:3602';

function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // -----------------------------------------------------
  // ADD: automatically save weather data to DB on Supabase every day at 12:00AM
  const fetchCitiesData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/cities`);
      setCities(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Make sure the server is running.');
      console.error('Error fetching cities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitiesData();
    // Update every minute
    const interval = setInterval(fetchCitiesData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading && cities.length === 0) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }


  function handleExchangeRatesClick(e) {
    e.preventDefault();

    window.location.href = EXCHANGE_RATES_URL;
  }

  return (
    <div className="app">
      <header className="app-header">
    {/*<button 
          onClick={handleExchangeRatesClick} 
          className="refresh-btn"
        >💰Exchange Rates</button> */}
        <h1>🌍 World Clocks & Weather</h1>
        <button onClick={fetchCitiesData} className="refresh-btn">
          🔄 Refresh
        </button>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="cities-container">
        {cities.map((cityData) => (
          <CityCard
            key={cityData.city}
            cityData={cityData}
          />
        ))}
      </div>

    </div>
  );
}

export default App;

