import React, { useState, useEffect } from 'react';
import './QuizFlow.css'; // Your custom styles

const sqlQuestions = [
  {
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Language", "Statement Question Language", "Strong Question Language"],
    answer: 0,
  },
  {
    question: "Which SQL statement is used to extract data?",
    options: ["GET", "EXTRACT", "SELECT", "CHOOSE"],
    answer: 2,
  },
  // Add 8 more...
];

function SqlDatabase() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // in seconds

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const handleNext = () => {
    if (selected !== null) {
      if (selected === sqlQuestions[current].answer) {
        setScore(score + 1);
      }
      setSelected(null);
      if (current + 1 < sqlQuestions.length) {
        setCurrent(current + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="result-screen">
        <h2>Quiz Completed!</h2>
        <p>Score: {(score / sqlQuestions.length) * 100}%</p>
        <p>Correct Answers: {score}</p>
        <p>Time Taken: {60 - timeLeft}s</p>
        <p>Achievement: 🏅 SQL Beginner</p>
        <button onClick={() => window.location.reload()}>Retake Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>SQL Database Essentials</h2>
      <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230510174745/Data-Analysis-with-Python.webp" alt="banner" />
      <p>Question {current + 1} of {sqlQuestions.length}</p>
      <p>{sqlQuestions[current].question}</p>
      <div className="options">
        {sqlQuestions[current].options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={selected === index ? 'selected' : ''}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={handleNext}>Next</button>
      <p className="timer">Time Left: {timeLeft}s</p>
    </div>
  );
}

export default SqlDatabase;
