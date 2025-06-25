// src/pages/AdminDashboard.js
import React from 'react';
import { Link } from "react-router-dom";


function AdminDashboard() {
  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <div className="row mt-4 g-3">
        {/* KPI Cards */}
        <div className="col-md-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text display-6">1,234</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Teachers</h5>
              <p className="card-text display-6">89</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">Students</h5>
              <p className="card-text display-6">1,145</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger h-100">
            <div className="card-body">
              <h5 className="card-title">Total Quizzes</h5>
              <p className="card-text display-6">456</p>
            </div>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="row mt-5 g-4">
        <div className="col-md-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">User Management</h5>
              <p className="card-text flex-grow-1">
                Manage users, roles, and permissions.
              </p>
            <Link to="/manage-users" className="btn btn-primary mt-auto">Manage Users</Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Content Management</h5>
              <p className="card-text flex-grow-1">Oversee quizzes and educational content.</p>
             <Link to="/content-management" className="btn btn-primary mt-auto">Manage Content</Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">System Analytics</h5>
              <p className="card-text flex-grow-1">View platform usage and performance metrics.</p>
               <Link to="/system-analytics" className="btn btn-primary mt-auto">View Analytics</Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Settings</h5>
              <p className="card-text flex-grow-1">Configure system settings and preferences.</p>
              <Link to="/settings" className="btn btn-primary mt-auto">  Open Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
