// src/components/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';
import '../assets/style.css'; // if you have extra styling

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) {
      alert('Full Name is required.');
      return;
    }

    if (!formData.email.trim()) {
      alert('Email is required.');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!formData.role) {
      alert('Please select your role (Teacher or Student).');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (!formData.agreeTerms) {
      alert('You must agree to the terms and privacy policy.');
      return;
    }

    console.log('Form submitted:', formData);
    // Call API here if needed
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Create Account</h2>

        <button type="button" className="google-btn">Sign up with Google</button>

        <div className="divider"><span>or</span></div>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <label className="terms-inline">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          />
          <span>
            I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
          </span>
        </label>

        <button type="submit" className="create-btn">Create Account</button>
        <button type="button" className="cancel-btn">Cancel</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
