import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StartTrip = () => {
  const [city, setCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  // Load locations from public/location.json
  useEffect(() => {
    fetch('/location.json')
      .then(res => res.json())
      .then(data => setLocations(data));
  }, []);

  // Start city suggestions
  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 0) {
      const filtered = locations
        .filter(loc =>
          loc.city &&
          loc.city.toLowerCase().includes(value.toLowerCase())
        )
        .map(loc => loc.city);
      const unique = [...new Set(filtered)].slice(0, 5);
      setCitySuggestions(unique);
    } else {
      setCitySuggestions([]);
    }
  };

  const handleCitySuggestionClick = (suggestion) => {
    setCity(suggestion);
    setCitySuggestions([]);
  };

  // Destination city suggestions
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestinationCity(value);

    if (value.length > 0) {
      const filtered = locations
        .filter(loc =>
          loc.city &&
          loc.city.toLowerCase().includes(value.toLowerCase())
        )
        .map(loc => loc.city);
      const unique = [...new Set(filtered)].slice(0, 5);
      setDestinationSuggestions(unique);
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleDestinationSuggestionClick = (suggestion) => {
    setDestinationCity(suggestion);
    setDestinationSuggestions([]);
  };

  // Handle search and navigation
  const handleSearch = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert('Please select start and end dates for your trip.');
      return;
    }
    if (!city || !destinationCity) {
      alert('Please select both start and destination cities.');
      return;
    }
    const days =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
    navigate('/route-preference', {
      state: { startCity: city, destinationCity, startDate, endDate, days }
    });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Start a New Trip</h2>
      <form onSubmit={handleSearch} autoComplete="off">
        {/* Start City */}
        <div style={{ position: 'relative', marginBottom: '25px' }}>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            required
            placeholder="Start city"
            style={{ marginLeft: '10px', width: '90%' }}
          />
          {citySuggestions.length > 0 && (
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: '0 10px',
                background: '#fff',
                border: '1px solid #ccc',
                borderTop: 'none',
                position: 'absolute',
                left: '10px',
                right: 0,
                zIndex: 10,
                maxHeight: '150px',
                overflowY: 'auto',
                width: '90%',
                textAlign: 'left'
              }}
            >
              {citySuggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  onClick={() => handleCitySuggestionClick(suggestion)}
                  style={{
                    padding: '8px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Destination City */}
        <div style={{ position: 'relative', marginBottom: '25px' }}>
          <input
            type="text"
            value={destinationCity}
            onChange={handleDestinationChange}
            required
            placeholder="Destination city"
            style={{ marginLeft: '10px', width: '90%' }}
          />
          {destinationSuggestions.length > 0 && (
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: '0 10px',
                background: '#fff',
                border: '1px solid #ccc',
                borderTop: 'none',
                position: 'absolute',
                left: '10px',
                right: 0,
                zIndex: 10,
                maxHeight: '150px',
                overflowY: 'auto',
                width: '90%',
                textAlign: 'left'
              }}
            >
              {destinationSuggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  onClick={() => handleDestinationSuggestionClick(suggestion)}
                  style={{
                    padding: '8px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Trip Dates */}
        <div style={{ marginBottom: '25px', textAlign: 'left', marginLeft: '10px' }}>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '25px', textAlign: 'left', marginLeft: '10px' }}>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Search</button>
      </form>
    </div>
  );
};

export default StartTrip;