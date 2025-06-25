import React from 'react';
import './Profile.css';

const Profile = ({ user }) => {
  if (!user) {
    return <div className="profile">Please log in to view your profile.</div>;
  }

  const { email, role } = user;

  const achievementsByRole = {
    student: ['Completed 10 quizzes', 'Top 5% in HTML Basics', 'Active for 30 days'],
    teacher: ['Created 15 quizzes', 'Received 95% positive feedback', 'Mentor of 5 students'],
    admin: ['Managed 3K users', 'System uptime 99.9%', 'Updated quiz database'],
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Role:</strong> {role.charAt(0).toUpperCase() + role.slice(1)}</p>

        <div className="achievements">
          <h3>Achievements</h3>
          <ul>
            {achievementsByRole[role]?.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
