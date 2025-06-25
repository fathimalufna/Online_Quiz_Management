import React, { useState, useEffect } from 'react';
import './QuizFlow.css';

const dataStructuresQuestions = [
  {
    question: "What is a data structure?",
    options: [
      "A programming language",
      "A way to store and organize data",
      "A type of algorithm",
      "A function in JavaScript",
    ],
    answer: 1,
  },
  {
    question: "Which data structure uses LIFO?",
    options: ["Queue", "Array", "Stack", "Tree"],
    answer: 2,
  },
  {
    question: "Which of the following is a linear data structure?",
    options: ["Graph", "Tree", "Stack", "Hash Table"],
    answer: 2,
  },
  {
    question: "In which data structure is data accessed sequentially?",
    options: ["Stack", "Queue", "Linked List", "Binary Tree"],
    answer: 2,
  },
  {
    question: "Which data structure has fast search operations?",
    options: ["Queue", "Hash Table", "Stack", "Array"],
    answer: 1,
  },
  {
    question: "Which operation is used to insert at the front in a queue?",
    options: ["Push", "Enqueue", "Insert", "Pop"],
    answer: 1,
  },
  {
    question: "Which data structure is best for implementing recursion?",
    options: ["Queue", "Stack", "Tree", "Heap"],
    answer: 1,
  },
  {
    question: "Which structure uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: 1,
  },
  {
    question: "Which is a non-linear data structure?",
    options: ["Array", "Queue", "Stack", "Binary Tree"],
    answer: 3,
  },
  {
    question: "Which is used to represent a hierarchical relationship?",
    options: ["Stack", "Tree", "Array", "Queue"],
    answer: 1,
  },
];

function DataStructures() {
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
      if (selected === dataStructuresQuestions[current].answer) {
        setScore(score + 1);
      }
      setSelected(null);
      if (current + 1 < dataStructuresQuestions.length) {
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
        <p>Score: {(score / dataStructuresQuestions.length) * 100}%</p>
        <p>Correct Answers: {score}</p>
        <p>Time Taken: {60 - timeLeft}s</p>
        <p>Achievement: 🏅 Data Structure Explorer</p>
        <button onClick={() => window.location.reload()}>Retake Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Data Structures Intro</h2>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFSF4cxtG8DaDp5mPooCR6uljDMD8hK0ncqQ&s" alt="banner" />
      <p>Question {current + 1} of {dataStructuresQuestions.length}</p>
      <p>{dataStructuresQuestions[current].question}</p>
      <div className="options">
        {dataStructuresQuestions[current].options.map((option, index) => (
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

export default DataStructures;
