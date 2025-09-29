import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CheapestRouteResults = () => {
  const location = useLocation();
  const { fromCity, toCity, startDate, days } = location.state || {};

  const [cheapestRoute, setCheapestRoute] = useState(null);

  useEffect(() => {
    if (!fromCity || !toCity || !startDate || !days) return;

    fetch(`http://localhost:8080/api/trips/cheapest?fromCity=${fromCity}&toCity=${toCity}&travelDate=${startDate}&days=${days}`)
      .then(res => {
        if (!res.ok) throw new Error('No trip found');
        return res.json();
      })
      .then(data => setCheapestRoute(data))
      .catch(err => console.error('Error fetching cheapest trip:', err));
  }, [fromCity, toCity, startDate, days]);

  const bookHotel = (hotel) => alert(`Booked ${hotel.name} for ${days} nights!`);
  const bookBus = (bus) => alert(`Booked ${bus.agency} from ${fromCity} to ${toCity}!`);

  if (!fromCity || !toCity) {
    return <div style={{ textAlign: 'center', marginTop: 40 }}>No trip selected.</div>;
  }

  if (!cheapestRoute) {
    return <div style={{ textAlign: 'center', marginTop: 40 }}>Loading cheapest route...</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto' }}>
      <h2>Cheapest Route from {fromCity} to {toCity}</h2>

      <div style={{ border: '2px solid #8f5cff', padding: 20, borderRadius: 10, marginBottom: 20, background: '#f9f5ff' }}>
        <h3>💰 Cheapest Combination</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <img src={cheapestRoute.hotel.image} alt={cheapestRoute.hotel.name} style={{ width: 200, height: 120, objectFit: 'cover', borderRadius: 8 }} />
            <h4>{cheapestRoute.hotel.name}</h4>
            <p>Price per Night: ₹{cheapestRoute.hotel.pricePerNight}</p>
          </div>
          <div>
            <img src={cheapestRoute.bus.image} alt={cheapestRoute.bus.agency} style={{ width: 200, height: 120, objectFit: 'cover', borderRadius: 8 }} />
            <h4>{cheapestRoute.bus.agency} - {cheapestRoute.bus.busType}</h4>
            <p>Fare: ₹{cheapestRoute.bus.fare}</p>
          </div>
        </div>
        <h4>Total Cost: ₹{cheapestRoute.totalCost}</h4>
        <button
          style={{ padding: '10px 20px', background: '#8f5cff', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' }}
          onClick={() => {
            bookHotel(cheapestRoute.hotel);
            bookBus(cheapestRoute.bus);
          }}
        >
          Book Cheapest Route
        </button>
      </div>
    </div>
  );
};

export default CheapestRouteResults;
