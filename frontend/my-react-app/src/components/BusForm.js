import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BusForm.css'; // import the CSS

const BusForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, fromCity, destinationCity, startDate, days } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fromCity: fromCity || '',
    destinationCity: destinationCity || '',
    startDate: startDate || '',
    days: days || '',
  });

  if (!bus) return <div>No bus selected.</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${formData.name} on ${bus.agency} bus from ${formData.fromCity} to ${formData.destinationCity} on ${formData.startDate}!`);
    navigate('/'); // Redirect after booking
  };

  return (
    <div className="bus-form-container">
      <h2>Booking Form for {bus.agency} - {bus.busType}</h2>
      <form className="bus-form" onSubmit={handleSubmit}>
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
          name="fromCity"
          placeholder="From City"
          value={formData.fromCity}
          readOnly
        />
        <input
          type="text"
          name="destinationCity"
          placeholder="Destination City"
          value={formData.destinationCity}
          readOnly
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={formData.startDate}
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

export default BusForm;
