// src/pages/TeacherDashboard.js
import React from 'react';
import { Link } from "react-router-dom";

function TeacherDashboard() {
  return (
    <div className="container mt-4">
      <h2>Teacher Dashboard</h2>

      <div className="row mt-4 g-3">
        {/* KPI Cards */}
        <div className="col-md-3">
          <div className="card bg-light h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Active Quizzes</h5>
              <p className="card-text display-6">8</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-light h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Students</h5>
              <p className="card-text display-6">156</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-light h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Avg Class Score</h5>
              <p className="card-text display-6">89%</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-light h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">This Month</h5>
              <p className="card-text display-6">24</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        {/* Left Panel Buttons */}
          <div className="button-group">
        <Link to="/create-quiz" className="btn btn-primary btn-lg">
          + Create New Quiz
        </Link>
        <Link to="/manage-quiz" className="btn btn-outline-primary btn-lg">
          Manage Quizzes
        </Link>
        
      </div>
        {/* Right Panel Recent Activity */}
        <div className="col-md-8">
          <h5>Recent Activity</h5>
          <ul className="list-group">
            <li className="list-group-item">
              Sarah Johnson completed <strong>"JavaScript Arrays"</strong> - Score: 92% (2 hours ago)
            </li>
            <li className="list-group-item">
              Mike Chen started <strong>"React Hooks Quiz"</strong> (4 hours ago)
            </li>
            <li className="list-group-item">
              Quiz <strong>"Node.js Fundamentals"</strong> was created (1 day ago)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
