import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // <-- import useNavigate
import './BusBooking.css';

const BusBooking = () => {
  const location = useLocation();
  const navigate = useNavigate(); // <-- initialize navigate
  const { fromCity, destinationCity, startDate, days } = location.state || {};
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    if (!fromCity || !destinationCity) return;

    fetch('/busbooking.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          bus =>
            bus.source.toLowerCase() === fromCity.toLowerCase() &&
            bus.destination.toLowerCase() === destinationCity.toLowerCase()
        );
        setBuses(filtered);
      })
      .catch(err => console.error('Error fetching buses:', err));
  }, [fromCity, destinationCity]);

  // <-- Change bookBus to navigate to BusForm
  const bookBus = (bus) => {
    navigate('/bus-form', {
      state: { bus, fromCity, destinationCity, startDate, days } // pass all needed info
    });
  };

  if (!fromCity || !destinationCity) {
    return <div className="no-buses">No trip selected.</div>;
  }

  return (
    <div className="bus-booking-container">
      <h2>Buses from {fromCity} to {destinationCity}</h2>
      {buses.length === 0 && <p className="no-buses">No buses found for this route.</p>}

      {buses.map((bus, index) => (
        <div key={index} className="bus-card">
          <img className="bus-image" src={bus.image} alt={`${bus.agency} ${bus.busType}`} />
          <div className="bus-info">
            <div>
              <h3>{bus.agency} - {bus.busType}</h3>
              <p>Fare: ₹{bus.fare}</p>
              <p>Seats Available: {bus.seats}</p>
              <p>Duration: {bus.duration}</p>
            </div>
            <button className="book-btn" onClick={() => bookBus(bus)}>Book Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusBooking;
