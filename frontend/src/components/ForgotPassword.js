// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter your registered email.');
      return;
    }

    // You would typically send an email with reset link here
    // For now, redirect directly to reset-password page
    alert('Reset link sent (mock). Now redirecting to reset password...');
    navigate('/reset-password');
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="create-btn">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
