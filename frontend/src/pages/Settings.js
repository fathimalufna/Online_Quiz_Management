// src/pages/Settings.js
import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [preferences, setPreferences] = useState({
    theme: "Light",
    notifications: true,
    language: "English",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
    // You can send preferences to backend here
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2>System Settings</h2>
        <p>Configure system settings and preferences.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Theme</label>
            <select name="theme" value={preferences.theme} onChange={handleChange}>
              <option>Light</option>
              <option>Dark</option>
              <option>System Default</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notifications</label>
            <input
              type="checkbox"
              name="notifications"
              checked={preferences.notifications}
              onChange={handleChange}
            />{" "}
            Enable email & app notifications
          </div>

          <div className="form-group">
            <label>Language</label>
            <select name="language" value={preferences.language} onChange={handleChange}>
              <option>English</option>
              <option>Tamil</option>
              <option>Sinhalese</option>
              <option>French</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success mt-3">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
