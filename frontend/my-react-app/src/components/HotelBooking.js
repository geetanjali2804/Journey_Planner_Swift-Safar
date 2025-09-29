import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './HotelBooking.css';

const HotelBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { destinationCity, sourceCity, startDate, endDate, days } = location.state || {};
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    if (!destinationCity) return;

    fetch('/hotelbooking.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          hotel => hotel.city.toLowerCase() === destinationCity.toLowerCase()
        );
        setHotels(filtered);
      })
      .catch(err => console.error('Error fetching hotels:', err));
  }, [destinationCity]);

  const handleBookNow = (hotel) => {
    // navigate to booking page with hotel info + previous data
    navigate('/hotel-form', {
      state: { hotel, destinationCity, sourceCity, startDate, endDate, days }
    });
  };

  if (!destinationCity) {
    return <div className="no-hotels">No destination selected.</div>;
  }

  return (
    <div className="hotel-booking-container">
      <h2>Available Hotels in {destinationCity}</h2>
      {hotels.length === 0 && <p className="no-hotels">No hotels found for this destination.</p>}

      {hotels.map(hotel => (
        <div key={hotel.id} className="hotel-card">
          <img className="hotel-image" src={hotel.image} alt={hotel.name} />
          <div className="hotel-info">
            <div>
              <h3>{hotel.name}</h3>
              <p>Price per Night: ₹{hotel.pricePerNight}</p>
              <p>Total Rooms: {hotel.totalRooms}</p>
            </div>
            <button className="book-btn" onClick={() => handleBookNow(hotel)}>Book Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelBooking;
