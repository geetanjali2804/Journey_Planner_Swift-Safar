import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupImg from '../assets/images/signup.jpg';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.text();
      if (response.ok) {
        alert('Signup successful!');
        navigate('/login');
      } else {
        alert(data);
      }
    } catch (error) {
      alert('Signup failed.');
    }
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <div className="signup-left">
          <h2>Sign Up</h2>
          <p>Create your account</p>
          <form onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </label>
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </label>
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <div className="signup-bottom">
            <span>Already have an account?</span>
            <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
        <div className="signup-right">
          <img src={signupImg} alt="Travel signup" className="signup-img" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
