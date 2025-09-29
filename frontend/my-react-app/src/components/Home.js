import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home.css';
import heroImg from '../assets/images/travel3.jpg';
import heroImg1 from '../assets/images/travel.jpg';
import heroImg2 from '../assets/images/travel2.jpg';
import heroImg3 from '../assets/images/travel4.webp';



const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // returns true if token exists
  };
  // Route Planner States
  const [city, setCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Interest-Based Search States
  const [interestCity, setInterestCity] = useState('');
  const [interestCitySuggestions, setInterestCitySuggestions] = useState([]);
  const [interest, setInterest] = useState('');
  const [places, setPlaces] = useState([]);

  // Locations Data
  const [locations, setLocations] = useState([]);
  // Load location.json
  useEffect(() => {
    fetch('/location.json')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error('Error loading location.json', err));
  }, []);

  // Route Planner City Suggestions
  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 0) {
      const filtered = locations
        .filter(loc => loc.city && loc.city.toLowerCase().includes(value.toLowerCase()))
        .map(loc => loc.city);
      setCitySuggestions([...new Set(filtered)].slice(0, 5));
    } else {
      setCitySuggestions([]);
    }
  };

  const handleCitySuggestionClick = (suggestion) => {
    setCity(suggestion);
    setCitySuggestions([]);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestinationCity(value);

    if (value.length > 0) {
      const filtered = locations
        .filter(loc => loc.city && loc.city.toLowerCase().includes(value.toLowerCase()))
        .map(loc => loc.city);
      setDestinationSuggestions([...new Set(filtered)].slice(0, 5));
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleDestinationSuggestionClick = (suggestion) => {
    setDestinationCity(suggestion);
    setDestinationSuggestions([]);
  };

  // Route Planner Search
  const handleRouteSearch = (e) => {
    e.preventDefault();

    // ✅ Require login
    if (!isAuthenticated()) {
      alert("Please log in to use this feature!");
      navigate("/login");
      return;
    }

    if (!startDate || !endDate) return alert('Please select trip dates.');
    if (!city || !destinationCity) return alert('Please enter both cities.');

    const days =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

    navigate('/route-preference', {
      state: { startCity: city, destinationCity, startDate, endDate, days },
    });
  };

  // Interest City Suggestions
  const handleInterestCityChange = (e) => {
    const value = e.target.value;
    setInterestCity(value);

    if (value.length > 0) {
      const filtered = locations
        .filter(loc => loc.city && loc.city.toLowerCase().includes(value.toLowerCase()))
        .map(loc => loc.city);
      setInterestCitySuggestions([...new Set(filtered)].slice(0, 5));
    } else {
      setInterestCitySuggestions([]);
    }
  };

  const handleInterestCitySuggestionClick = (suggestion) => {
    setInterestCity(suggestion);
    setInterestCitySuggestions([]);
  };

  // Interest-Based Search
  const handleInterestSearch = (e) => {
    e.preventDefault();

    // ✅ Require login
    if (!isAuthenticated()) {
      alert("Please log in to explore interests!");
      navigate("/login");
      return;
    }

    if (!interestCity || !interest) {
      alert('Please select both a city and interest!');
      return;
    }

    navigate('/interest-results', { state: { city: interestCity, interest } });
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">SwiftSafar</div>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>

          {!isAuthenticated() ? (
            <>
              <a href="/login" className="nav-btn">Login</a>
              <a href="/signup" className="nav-btn nav-btn-primary">Sign Up</a>
            </>
          ) : (
            <button onClick={handleLogout} className="nav-btn nav-btn-primary">Logout</button>
          )}
        </nav>
      </header>

      {/* Hero */}
<section className="hero">
  <div className="hero-text">
    <h1>Plan Your <span>Perfect Journey</span></h1>
    <p>Find the cheapest routes, best hotels, and unforgettable destinations — all in one place.</p>
  </div>

  <div className="hero-gallery">
    <img src={heroImg1} alt="Travel 1" />
    <img src={heroImg2} alt="Travel 2" />


  </div>
</section>



      {/* Route Planner */}
      <section className="trip-planner">
        <h2>🗺️ Start Your Trip</h2>
        <form onSubmit={handleRouteSearch} autoComplete="off" className="planner-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Start City"
              value={city}
              onChange={handleCityChange}
              required
            />
            {citySuggestions.length > 0 && (
              <ul className="suggestion-list">
                {citySuggestions.map((s, i) => (
                  <li key={i} onClick={() => handleCitySuggestionClick(s)}>{s}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Destination City"
              value={destinationCity}
              onChange={handleDestinationChange}
              required
            />
            {destinationSuggestions.length > 0 && (
              <ul className="suggestion-list">
                {destinationSuggestions.map((s, i) => (
                  <li key={i} onClick={() => handleDestinationSuggestionClick(s)}>{s}</li>
                ))}
              </ul>
            )}
          </div>

          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />

          <button type="submit" className="primary-btn">Search Route</button>
        </form>
      </section>

      {/* Interest-Based Search */}
      <section className="journey-planner">
        <h2>✨ Explore by Interest</h2>
        <form onSubmit={handleInterestSearch} className="search-form" autoComplete="off">
          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              value={interestCity}
              onChange={handleInterestCityChange}
              placeholder="Enter city for interest search"
              required
            />
            {interestCitySuggestions.length > 0 && (
              <ul className="suggestion-list">
                {interestCitySuggestions.map((s, i) => (
                  <li key={i} onClick={() => handleInterestCitySuggestionClick(s)}>{s}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="input-group">
            <label>Interest</label>
            <select value={interest} onChange={e => setInterest(e.target.value)} required>
              <option value="">-- Select Interest --</option>
              <option value="Sightseeing & Exploration">Sightseeing & Exploration</option>
              <option value="Religious & Spiritual Pilgrimages">Religious & Spiritual Pilgrimages</option>
              <option value="Historical & Cultural">Historical & Cultural</option>
              <option value="Nature & Parks">Nature & Parks</option>
              <option value="Adventure & Outdoor Activities">Adventure & Outdoor Activities</option>
            </select>
          </div>

          <button type="submit" className="primary-btn">Show Places</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
