// src/components/StudentDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  // Sample KPI data
  const kpis = [
    { icon: '↑', label: 'Quizzes Completed', value: 12, bg: 'primary' },
    { icon: '📊', label: 'Average Score', value: '87%', bg: 'success' },
    { icon: '🏅', label: 'Points Earned', value: '24K', bg: 'warning' },
    { icon: '⏰', label: 'Hours Studied', value: 8, bg: 'info' },
  ];

  // Sample Learning Path
  const learningPath = [
    { course: 'JavaScript Basics', progress: 80 },
    { course: 'React Fundamentals', progress: 50 },
    { course: 'HTML & CSS', progress: 100 },
    { course: 'Python Programming', progress: 25 },
  ];

  // Sample Recent Activities
  const recentActivities = [
    'Completed "React Basics" quiz',
    'Scored 90% in "JavaScript Quiz 1"',
    'Started "Python Programming" course',
  ];

  // Sample Suggested Quizzes
  const suggestedQuizzes = [
    'Advanced React Patterns',
    'CSS Grid and Flexbox',
    'ES6 Features Quiz',
  ];

  return (
    <div
      className="min-vh-100 p-4"
      style={{
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        color: 'white',
      }}
    >
      {/* Navbar - same concept as your Login page, but with React Router Link */}
      <nav className="navbar navbar-expand-lg navbar-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            QuizApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/student-dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/quizzes">
                  Quizzes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Welcome message */}
      <h1 className="mb-4">Welcome back, Student!</h1>

      {/* KPIs */}
      <div className="row g-3 mb-5">
        {kpis.map(({ icon, label, value, bg }) => (
          <div key={label} className="col-6 col-md-3">
            <div className={`card text-white bg-${bg} h-100`}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <div
                  className="display-4"
                  style={{ fontWeight: 'bold', fontSize: '2.5rem' }}
                >
                  {icon} {value}
                </div>
                <div>{label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Path */}
      <section className="mb-5">
        <h2>Your Learning Path</h2>
        {learningPath.map(({ course, progress }) => (
          <div className="mb-3" key={course}>
            <div className="d-flex justify-content-between">
              <div>{course}</div>
              <div>{progress}%</div>
            </div>
            <div className="progress" style={{ height: '20px' }}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Recent Activities and Suggested Quizzes */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card bg-light text-dark h-100">
            <div className="card-header fw-bold">Recent Activities</div>
            <ul className="list-group list-group-flush">
              {recentActivities.map((activity, idx) => (
                <li className="list-group-item" key={idx}>
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card bg-light text-dark h-100">
            <div className="card-header fw-bold">Suggested Quizzes</div>
            <ul className="list-group list-group-flush">
              {suggestedQuizzes.map((quiz, idx) => (
                <li className="list-group-item" key={idx}>
                  {quiz}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-4">
        <Link to="/quizzes" className="btn btn-outline-light btn-lg">
          Browse Quizzes & Continue Learning
        </Link>
      </div>
    </div>
  );
}

export default StudentDashboard;
