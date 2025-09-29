import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserHome from './components/UserHome';
import StartTrip from './components/StartTrip';
import RoutePreference from './components/RoutePreference';
import CheapestRouteResults from './components/CheapestRouteResults';
import LessWalkingResults from './components/LessWalkingResults';
import InterestResults from './components/InterestResults';
// import Chat from './components/Chat';
import HotelBooking from './components/HotelBooking';
import BusBooking from './components/BusBooking';
import HotelForm from './components/HotelForm';
import BusForm from './components/BusForm';
import Contact from './components/Contact';
import About from './components/About';
     


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/start-trip" element={<StartTrip />} />
        <Route path="/route-preference" element={<RoutePreference />} />
        <Route path="/cheapest-route-results" element={<CheapestRouteResults />} />
        <Route path="/interest-results" element={<InterestResults />} />
        <Route path="/hotel-booking" element={<HotelBooking />} />
        <Route path="/bus-form" element={<BusForm />} />
        <Route path="/hotel-form" element={<HotelForm />} />
        <Route path="/bus-booking" element={<BusBooking />} />
        <Route path="/less-walking-results" element={<LessWalkingResults />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}

export default App;