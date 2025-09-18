// src/CheapestRouteResults.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CheapestRouteResults = () => {
  const location = useLocation();
  const { fromCity, toCity, startDate, endDate, days } = location.state || {};
  const [hotels, setHotels] = useState([]);
  const [buses, setBuses] = useState([]);


console.log("Location state received:", location.state);


  useEffect(() => {
    if (fromCity && toCity && startDate && endDate && days) {
      fetch('http://localhost:8080/api/routes/cheap-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startCity: fromCity,
          destinationCity: toCity,
          tripDays: days
        })
      })
      .then(response => response.json())
      .then(data => {
        setHotels(data.hotels || []);
        setBuses(data.buses || []);
      })
      .catch(error => {
        console.error("Error fetching cheapest options:", error);
      });
    }
  }, [fromCity, toCity, startDate, endDate, days]);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', textAlign: 'center' }}>
      <h2>Cheapest Route Results</h2>
      <p>From: {fromCity} | To: {toCity}</p>
      <p>Trip: {startDate} to {endDate} ({days} days)</p>

      <h3>Top 5 Cheapest Hotels</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Hotel Name</th>
            <th>Rating</th>
            <th>Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length > 0 ? hotels.map((hotel, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{hotel.hotelName}</td>
              <td>{hotel.rating} ({hotel.ratingDescription})</td>
              <td>{hotel.price} + {hotel.tax}</td>
            </tr>
          )) : (
            <tr><td colSpan="3">No hotels found.</td></tr>
          )}
        </tbody>
      </table>

      <h3 style={{ marginTop: '30px' }}>Top 5 Cheapest Buses</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Agency</th>
            <th>Bus Type</th>
            <th>Fare (₹)</th>
            <th>Duration (hrs)</th>
          </tr>
        </thead>
        <tbody>
          {buses.length > 0 ? buses.map((bus, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{bus.agency}</td>
              <td>{bus.busType}</td>
              <td>{bus.farePrice.toFixed(2)}</td>
              <td>{bus.duration.toFixed(1)}</td>
            </tr>
          )) : (
            <tr><td colSpan="4">No buses found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CheapestRouteResults;
