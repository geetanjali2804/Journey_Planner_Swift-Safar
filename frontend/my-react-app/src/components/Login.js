import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginImg from '../assets/images/login1.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Parse the response body
      const data = await response.json();

      if (response.ok) {
        // ✅ Save JWT token to localStorage
        localStorage.setItem('token', data.token);

        alert('Login successful!');
        navigate('/'); // redirect to home/dashboard
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-left">
          <h2>Login</h2>
          <p>Enter your account details</p>
          <form onSubmit={handleLogin}>
            <label>
              Username
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </label>
            {error && <div className="login-error">{error}</div>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <div className="login-bottom">
            <span>Don't have an account?</span>
            <button className="signup-btn" onClick={() => navigate('/signup')}>
              Sign up
            </button>
          </div>
        </div>

        <div className="login-right">
          <img src={loginImg} alt="Travel" className="login-img" />
        </div>
      </div>
    </div>
  );
};

export default Login;
