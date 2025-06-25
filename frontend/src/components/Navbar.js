// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ isLoggedIn, userRole }) {
  const location = useLocation();

  const currentPath = location.pathname;

  const guestLinks = [
    { path: '/', name: 'Home' },
    { path: '/quizzes', name: 'Quizzes' },
    { path: '/login', name: 'Login' },
    { path: '/register', name: 'Register' },
  ];

  const userLinks = [
    { path: '/', name: 'Home' },
    { path: '/quizzes', name: 'Quizzes' },
    {
      path:
      userRole === 'admin'
        ? '/admin-dashboard'
        : userRole === 'teacher'
        ? '/teacher-dashboard'
        : userRole === 'student'
        ? '/student-dashboard'
        : '/',
    name: 'Dashboard',
  },
];

  // These should only show inside admin/teacher dashboards
 const dashboardExtras =
  (currentPath === '/admin-dashboard' ||
   currentPath === '/teacher-dashboard' ||
   currentPath === '/student-dashboard') &&
  isLoggedIn && (
    <>
      <li className="nav-item">
        <Link
          to="/profile"
          className={`nav-link ${currentPath === '/profile' ? 'active' : ''}`}
        >
          Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/logout"
          className={`nav-link ${currentPath === '/logout' ? 'active' : ''}`}
        >
          Logout
        </Link>
      </li>
    </>
  );


  const navLinks = isLoggedIn ? userLinks : guestLinks;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/quizlogo1.jpg"
            alt="QuizApp Logo"
            width="40"
            height="40"
            className="me-2"
            style={{ borderRadius: '50%' }}
          />
          <span className="fs-4 fw-bold">QuizApp</span>
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
            {navLinks.map(({ path, name }) => (
              <li className="nav-item" key={path}>
                <Link
                  to={path}
                  className={`nav-link ${currentPath === path ? 'active' : ''}`}
                >
                  {name}
                </Link>
              </li>
            ))}

            {/* Show Profile & Logout only inside admin/teacher dashboard */}
            {dashboardExtras}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
