import { useNavigate, useLocation } from 'react-router-dom';

const RoutePreference = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { city: toCity, startDate, endDate, days } = location.state || {};

  // Default starting city
  const fromCity = 'Delhi'; // You can change this to any default city

  if (!toCity || !days) {
    return (
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        Missing trip information. Please start your trip again.
      </div>
    );
  }

  // const handleSelect = (preference) => {
  //   if (preference === 'Cheapest Route') {
  //     navigate('/cheapest-route-results', {
  //       state: { fromCity, toCity, startDate, endDate, days }
  //     });
  //   } else if (preference === 'Less Walking') {
  //     navigate('/less-walking-results', {
  //       state: { city: toCity, days }
  //     });
  //   }
  // };
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
  }
};

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', textAlign: 'center' }}>
      <h2>Choose Your Route Preference</h2>
      <button
        style={{
          margin: '20px',
          padding: '15px 30px',
          fontSize: '1.1rem',
          borderRadius: '8px',
          border: 'none',
          background: '#8f5cff',
          color: '#fff',
          cursor: 'pointer'
        }}
        onClick={() => handleSelect('Cheapest Route')}
      >
        Cheapest Route
      </button>
      <button
        style={{
          margin: '20px',
          padding: '15px 30px',
          fontSize: '1.1rem',
          borderRadius: '8px',
          border: 'none',
          background: '#23233a',
          color: '#fff',
          cursor: 'pointer'
        }}
        onClick={() => handleSelect('Less Walking')}
      >
        Less Walking
      </button>
    </div>
  );
};

export default RoutePreference;
