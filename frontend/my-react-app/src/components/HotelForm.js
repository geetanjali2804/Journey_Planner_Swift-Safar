import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './HotelForm.css';

const HotelForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, destinationCity, sourceCity, days } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destinationCity: destinationCity || '',
    days: days || '',
  });

  if (!hotel) {
    return <div>No hotel selected.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${formData.name} at ${hotel.name} for ${formData.days} days!`);
    navigate('/'); // redirect back to homepage
  };

  return (
    <div className="booking-form-container">
      <h2>Booking Form for {hotel.name}</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destinationCity"
          placeholder="Destination City"
          value={formData.destinationCity}
          readOnly
        />
        <input
          type="number"
          name="days"
          placeholder="Days"
          value={formData.days}
          readOnly
        />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default HotelForm;
