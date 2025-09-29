import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './InterestResults.css';

const InterestResults = () => {
  const location = useLocation();
  const { city, interest } = location.state || {};
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!city || !interest) return;

    // Fetch interest.json from public folder
    fetch("/interest.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((loc) => {
          if (!loc.city || !loc.interest) return false;

          const cityMatch = loc.city.trim().toLowerCase() === city.trim().toLowerCase();

          const locInterests = loc.interest
            .split(",") // split multiple interests
            .map((i) => i.trim().toLowerCase());

          const interestMatch = locInterests.includes(interest.trim().toLowerCase());

          return cityMatch && interestMatch;
        });

        setPlaces(filtered);
      })
      .catch((err) => console.error("Error fetching interest.json:", err));
  }, [city, interest]);

  return (
    <div className="interest-results">
      <h2>
        Places in <span>{city}</span> for <span>{interest}</span>
      </h2>

      {places.length > 0 ? (
        <ul>
          {places.map((p, i) => (
            <li key={i}>
              <strong>{p.popular_destination}</strong> <br />
              ⭐ Rating: {p.google_rating} | 💰 Entry: ₹{p.price_fare}
            </li>
          ))}
        </ul>
      ) : (
        <p>No places found for this city and interest.</p>
      )}
    </div>
  );
};

export default InterestResults;
