// src/pages/UserManagement.js
import React, { useState } from "react";
import "./UserManagement.css";

const UserManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("Teacher");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Teacher",
    subject: "",
    class: "",
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers([...users, formData]);
    setFormData({
      name: "",
      email: "",
      role: "Teacher",
      subject: "",
      class: "",
    });
    setShowForm(false);
  };

  const filteredUsers = users.filter((user) => user.role === activeTab);

  return (
    <div className="user-management-container">
      <div className="user-management-card">
        <h2>User Management</h2>
        <p>Manage users, roles, and permissions within the platform.</p>

        <div className="tabs">
          <button
            className={activeTab === "Teacher" ? "active" : ""}
            onClick={() => setActiveTab("Teacher")}
          >
            Teachers
          </button>
          <button
            className={activeTab === "Student" ? "active" : ""}
            onClick={() => setActiveTab("Student")}
          >
            Students
          </button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {activeTab === "Teacher" && <th>Subject</th>}
              {activeTab === "Student" && <th>Class</th>}
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No {activeTab.toLowerCase()}s added yet.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {activeTab === "Teacher" && <td>{user.subject}</td>}
                  {activeTab === "Student" && <td>{user.class}</td>}
                  <td>{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {showForm ? (
          <form className="add-user-form" onSubmit={handleAddUser}>
            <h4>Add {activeTab}</h4>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            {activeTab === "Teacher" && (
              <input
                type="text"
                required
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value, role: "Teacher" })}
              />
            )}

            {activeTab === "Student" && (
              <input
                type="text"
                required
                placeholder="Class"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value, role: "Student" })}
              />
            )}

            <button type="submit" className="btn btn-success">
              Save {activeTab}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <button className="btn btn-success mt-3" onClick={() => setShowForm(true)}>
            Add New {activeTab}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
