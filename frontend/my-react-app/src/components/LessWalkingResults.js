import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LessWalkingResults = () => {
  const location = useLocation();
  const { city, days } = location.state || {};
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (city && days) {
      fetch('/api/trip/less-walking-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, days })
      })
        .then(res => res.json())
        .then(data => {
          setPlan(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [city, days]);

  // Split plan into days
  const getItinerary = () => {
    if (!plan.length || !days) return [];
    const perDay = Math.ceil(plan.length / days);
    let itinerary = [];
    for (let i = 0; i < days; i++) {
      itinerary.push(plan.slice(i * perDay, (i + 1) * perDay));
    }
    return itinerary;
  };

  if (!city || !days) {
    return <div style={{textAlign: 'center', marginTop: 40}}>Missing trip info.</div>;
  }

  const itinerary = getItinerary();

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      <h2>Less Walking Itinerary for {city}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {itinerary.map((dayPlan, dayIdx) => (
            <div key={dayIdx} style={{marginBottom: 32}}>
              <h3>Day {dayIdx + 1}</h3>
              <ol>
                {dayPlan.map((place, idx) => (
                  <li key={idx} style={{marginBottom: 12}}>
                    <strong>{place.popular_destination}</strong><br />
                    Interest: {place.interest}<br />
                    Google Rating: {place.google_rating}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessWalkingResults;