import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2>About SwiftSafar</h2>

      <div className="about-content">
        <p>
          Welcome to <strong>SwiftSafar</strong>, your ultimate journey planner!
          Our platform helps you plan trips efficiently by finding the cheapest routes, best hotels,
          and must-visit destinations across India.
        </p>

        <p>
          With SwiftSafar, you can:
        </p>

        <ul>
          <li>Discover affordable travel routes between cities.</li>
          <li>Find the best hotels matching your budget and preferences.</li>
          <li>Explore popular destinations based on your interests.</li>
          <li>Plan your trip with ease and get all information in one place.</li>
        </ul>

        <p>
          Our mission is to make travel planning <strong>simple, fun, and cost-effective</strong> for everyone.
          Whether you're traveling solo, with friends, or with family, SwiftSafar ensures a smooth journey
          from start to finish.
        </p>

        <p>
          Join thousands of travelers who trust SwiftSafar to plan their perfect trips!
        </p>
      </div>
    </div>
  );
};

export default About;
