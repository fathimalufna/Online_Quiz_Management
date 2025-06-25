// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import CreateQuiz from "./pages/CreateQuiz";
import ManageQuizzes from "./pages/ManageQuizzes";

import Quizzes from './pages/Quizzes';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './pages/Profile';
import Logout from './pages/Logout';

import UserManagement from "./pages/UserManagement";
import ContentManagement from "./pages/ContentManagement";
import SystemAnalytics from "./pages/SystemAnalytics";
import Settings from "./pages/Settings";
import AdvancedJava from "./pages/AdvancedJava";
import AdvancedSql from "./pages/AdvancedSql";
import Algorithms from "./pages/AlgorithmsInt";
import JavaScript from "./pages/JavaScript";
import Python from "./pages/Python";
import PythonData from "./pages/PyhtonData";
import ReactInt from "./pages/ReactInt";
import ReactHook from "./pages/ReactHook";
import SqlDatabase from "./pages/SqlDatabase";
import Html from "./pages/Html";
import Responsive from "./pages/Responsive";
import AlgorithmsInt from "./pages/AlgorithmsInt";
import Datastructure from "./pages/Datastructure";

import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />

      <div className="container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/manage-users" element={<UserManagement />} /> 
          <Route path="/system-analytics" element={<SystemAnalytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/manage-quiz" element={<ManageQuizzes />} />
            
<Route path="/content-management" element={<ContentManagement />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/logout"
            element={<Logout setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
          />

          {/* ✅ Added quiz route for Quizes*/}
            <Route path="/assessments/2" element={<AdvancedJava />} />
        <Route path="/assessments/10" element={<AdvancedSql />} />
        <Route path="/assessments/3" element={<Algorithms />} />
        <Route path="/assessments/1" element={<JavaScript />} />
        <Route path="/assessments/7" element={<Python />} />
        <Route path="/assessments/8" element={<PythonData />} />
        <Route path="/assessments/3" element={<ReactInt />} />
        <Route path="/assessments/4" element={<ReactHook />} />
        <Route path="/assessments/9" element={<SqlDatabase />} />
        <Route path="/assessments/6" element={<Responsive />} />
        <Route path="/assessments/12" element={<AlgorithmsInt />} />
         <Route path="/assessments/5" element={<Html />} />
         <Route path="/assessments/11" element={<Datastructure />} />
      </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
