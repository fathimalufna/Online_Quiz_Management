// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/style.css';

const Login = ({ setIsLoggedIn, setUserRole }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
    role: 'Admin',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login validation — Replace with your actual login logic
    if (formData.email && formData.password) {
      // Update global login state here
      setIsLoggedIn(true);
      setUserRole(formData.role);

      if (formData.role === 'Admin') {
        navigate('/admin-dashboard');
      } else if (formData.role === 'Teacher') {
        navigate('/teacher-dashboard');
      } else if (formData.role === 'Student') {
        navigate('/student-dashboard');
      }
    } else {
      alert('Invalid login');
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login to QuizApp</h2>

        <button type="button" className="social-btn google">Continue with Google</button>
        <button type="button" className="social-btn github">Continue with GitHub</button>

        <div className="divider"><span>or</span></div>

        <input
          type="email"
          name="email"
          placeholder="raamesh@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="password-field">
          <input
            type={formData.showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {formData.showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>

        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            /> Remember me
          </label>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button type="submit" className="login-btn">Login</button>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

        <p className="terms">
          By logging in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
};

export default Login;
