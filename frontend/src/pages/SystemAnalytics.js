// src/pages/SystemAnalytics.js
import React from "react";
import "./SystemAnalytics.css";

const SystemAnalytics = () => {
  return (
    <div className="analytics-container">
      <div className="analytics-card">
        <h2>System Analytics</h2>
        <p>View platform usage and performance metrics.</p>

        <div className="analytics-section">
          <h4>User Activity</h4>
          <p>Daily login statistics and active users by role.</p>
        </div>

        <div className="analytics-section">
          <h4>Quiz Performance</h4>
          <p>Average scores, completion rates, and popular quizzes.</p>
        </div>

        <div className="analytics-section">
          <h4>Platform Load</h4>
          <p>Monitor request traffic and system performance over time.</p>
        </div>

        <div className="analytics-section">
          <h4>Feedback Trends</h4>
          <p>Analyze feedback patterns from students and teachers.</p>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
