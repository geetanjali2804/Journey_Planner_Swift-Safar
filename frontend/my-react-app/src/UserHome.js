import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const navigate = useNavigate();

  const handleStartTrip = () => {
    navigate('/start-trip');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>No Trip Planned Yet !!!</h1>
      <p>Time to plan new Tavel! The world is full of adventures, and I am excited to explore!</p>
      <button onClick={handleStartTrip} style={{ marginTop: '30px', padding: '10px 20px', fontSize: '16px' }}>
        Start a New Trip
      </button>
    </div>
  );
};

export default UserHome;
