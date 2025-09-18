// ...existing code from Home.js...
import React from 'react';
// import { Link } from 'react-router-dom';
import '../Home.css';
import travelImg from '../assets/images/travel.jpg';
import travelImg2 from '../assets/images/travel2.jpg'; 
import travelImg3 from '../assets/images/travel3.jpg';
import travelImg4 from '../assets/images/travel4.webp';

const Home = () => (
  <div className="homepage">
    <header className="navbar">
      <div className="logo">SwiftSafar</div>
      <nav>
        <a href="/">Home</a>
        <a href="/destination">Destination</a>
        <a href="/flight">Flight</a>
        <a href="/booking">Booking</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact us</a>
       <a href="/login" className="nav-btn">Log In</a>
       <a href="/signup" className="nav-btn nav-btn-primary">Sign In</a>
      </nav>
    </header>

    <section className="hero">
      <div className="hero-content">
        <h1>Travel Memories<br />You’ll Never Forget</h1>
        <p>Two proximately switches detect when the value has reached the end of its travel</p>
        <div className="hero-buttons">
          <button className="primary-btn">Find Out More</button>
          <button className="secondary-btn">Play Demo</button>
        </div>
      </div>
      <div className="hero-image">
        {/* Add your hero image here */}
        <img src={travelImg} alt="Travel" />
        <img src={travelImg2} alt="Travel 2" className="hero-img" />
        <img src={travelImg3} alt="Travel 3" className="hero-img" />
          <img src={travelImg4} alt="Travel 4" className="hero-img" />
      </div>
    </section>

    <section className="find-destination">
      <h2>Find Your Best <span>Destination</span></h2>
      <p>We have more than 2000 destination you can choose</p>
      <div className="search-bar">
        <input type="text" placeholder="Search Destination" />
        <button className="primary-btn">Search</button>
      </div>
      <div className="destination-cards">
        {/* Add destination images/cards here */}
        <div className="destination-card">Amazon</div>
        <div className="destination-card">...</div>
        <div className="destination-card">...</div>
      </div>
    </section>

    <section className="blog-section">
      <h2>Our Blog</h2>
      <div className="blog-card">
        <h3>Beautiful Kashmir Let’s Travel</h3>
        <p>We are ready to help you build and also realize the room design that you dream of, with our experts and also the best category recommendations from us</p>
        <a href="/blog">Read more →</a>
      </div>
    </section>

    <section className="easy-travel">
      <h2>We Make World Travel Easy</h2>
      <p>Navigating the globe effortlessly, we transform wanderlust dreams into seamless adventures. With us, the world becomes your accessible playground, travel simplified.</p>
      <button className="primary-btn">Explore Our Tour →</button>
    </section>

    <footer>
      <div>Powered By<br />Uto turistor</div>
      <div>Call center<br />International call center</div>
      <div>
        Subscribe to our newsletter<br />
        <input type="email" placeholder="Email address" />
        <button>Join Now</button>
      </div>
      <div>
        Download our mobile app
        {/* Add app image or link here */}
      </div>
      <div>
        <a href="/">Privacy Policy</a> | <a href="/">Cookies</a>
      </div>
      <div>
        Connect with us:
        <a href="/">Twitter</a>
        <a href="/">Instagram</a>
        <a href="/">Facebook</a>
      </div>
    </footer>
  </div>
);

export default Home;