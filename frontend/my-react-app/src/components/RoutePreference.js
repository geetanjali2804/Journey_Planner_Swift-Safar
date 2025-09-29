import { useNavigate, useLocation } from 'react-router-dom';

const RoutePreference = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startCity: fromCity, destinationCity: toCity, startDate, endDate, days } = location.state || {};

  if (!fromCity || !toCity || !days) {
    return (
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        Missing trip information. Please start your trip again.
      </div>
    );
  }

  const handleSelect = (preference) => {
    console.log("Trip data before navigate:", { fromCity, toCity, startDate, endDate, days });

    if (preference === 'Cheapest Route') {
      navigate('/cheapest-route-results', {
        state: { fromCity, toCity, startDate, endDate, days }
      });
    } else if (preference === 'Less Walking') {
      navigate('/less-walking-results', {
        state: { city: toCity, days }
      });
    } else if (preference === 'Hotel Booking') {
      navigate('/hotel-booking', {
        state: { destinationCity: toCity, startDate, endDate, days }
      });
    } else if (preference === 'Bus Booking') {
      navigate('/bus-booking', {
        state: { fromCity, destinationCity: toCity, startDate, days }
      });
    }
  };

  const buttonStyle = {
    margin: '20px',
    padding: '15px 30px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    cursor: 'pointer'
  };

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', textAlign: 'center' }}>
      <h2>Choose Your Route Preference</h2>

      <button
        style={{ ...buttonStyle, background: '#8f5cff' }}
        onClick={() => handleSelect('Cheapest Route')}
      >
        Cheapest Route
      </button>

      <button
        style={{ ...buttonStyle, background: '#23233a' }}
        onClick={() => handleSelect('Less Walking')}
      >
        Less Walking
      </button>

      <button
        style={{ ...buttonStyle, background: '#ff6f61' }}
        onClick={() => handleSelect('Hotel Booking')}
      >
        Hotel Booking
      </button>

      <button
        style={{ ...buttonStyle, background: '#00a86b' }}
        onClick={() => handleSelect('Bus Booking')}
      >
        Bus Booking
      </button>
    </div>
  );
};

export default RoutePreference;
