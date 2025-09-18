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
   

<Route path="/less-walking-results" element={<LessWalkingResults />} />
      </Routes>
    </Router>
  );
}

export default App;