import React, { useState, useEffect } from 'react';
import './QuizFlow.css';

const advancedSqlQuestions = [
  {
    question: "What is a window function in SQL?",
    options: [
      "A type of join",
      "A function that performs a calculation across a set of table rows related to the current row",
      "A function used for UI operations",
      "An SQL aggregate function",
    ],
    answer: 1,
  },
  {
    question: "Which clause is used with window functions?",
    options: ["ORDER BY", "OVER", "GROUP BY", "WINDOW"],
    answer: 1,
  },
  {
    question: "What does a LEFT JOIN return?",
    options: [
      "Only matching rows from both tables",
      "All rows from the right table",
      "All rows from the left table and matching rows from the right",
      "All rows from both tables",
    ],
    answer: 2,
  },
  {
    question: "Which keyword is used to remove duplicates?",
    options: ["REMOVE", "DELETE", "DISTINCT", "UNIQUE"],
    answer: 2,
  },
  {
    question: "Subqueries can be used in?",
    options: ["SELECT", "INSERT", "UPDATE", "All of the above"],
    answer: 3,
  },
  {
    question: "Which function returns the number of rows?",
    options: ["COUNT()", "SUM()", "LENGTH()", "ROWS()"],
    answer: 0,
  },
  {
    question: "What does the COALESCE function do?",
    options: [
      "Combines two tables",
      "Returns the first non-null value",
      "Adds numbers",
      "Deletes null values",
    ],
    answer: 1,
  },
  {
    question: "Which clause filters rows after grouping?",
    options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"],
    answer: 1,
  },
  {
    question: "Which SQL keyword is used to create an index?",
    options: ["ADD INDEX", "CREATE INDEX", "MAKE INDEX", "SET INDEX"],
    answer: 1,
  },
  {
    question: "Which is used to rank rows without skipping numbers?",
    options: ["ROW_NUMBER()", "RANK()", "DENSE_RANK()", "NTILE()"],
    answer: 2,
  },
];

function AdvancedSql() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

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
      if (selected === advancedSqlQuestions[current].answer) {
        setScore(score + 1);
      }
      setSelected(null);
      if (current + 1 < advancedSqlQuestions.length) {
        setCurrent(current + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="result-screen">
        <h2>Quiz Completed!</h2>
        <p>Score: {(score / advancedSqlQuestions.length) * 100}%</p>
        <p>Correct Answers: {score}</p>
        <p>Time Taken: {60 - timeLeft}s</p>
        <p>Achievement: 🏅 SQL Master</p>
        <button onClick={() => window.location.reload()}>Retake Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Advanced SQL Queries</h2>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFSF4cxtG8DaDp5mPooCR6uljDMD8hK0ncqQ&s" alt="banner" />
      <p>Question {current + 1} of {advancedSqlQuestions.length}</p>
      <p>{advancedSqlQuestions[current].question}</p>
      <div className="options">
        {advancedSqlQuestions[current].options.map((option, index) => (
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

export default AdvancedSql;
