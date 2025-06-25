import React, { useState, useEffect } from 'react';
import './QuizFlow.css';

const algorithmQuestions = [
  {
    question: "Which sorting algorithm is the fastest in the average case?",
    options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
    answer: 2,
  },
  {
    question: "What is the time complexity of Binary Search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: 1,
  },
  {
    question: "Which algorithm is used to find the shortest path in a graph?",
    options: ["Dijkstra's Algorithm", "Prim's Algorithm", "Kruskal's Algorithm", "Binary Search"],
    answer: 0,
  },
  {
    question: "Which of the following is a divide and conquer algorithm?",
    options: ["Merge Sort", "Bubble Sort", "Linear Search", "Insertion Sort"],
    answer: 0,
  },
  {
    question: "What is the worst-case time complexity of Quick Sort?",
    options: ["O(n^2)", "O(n)", "O(log n)", "O(n log n)"],
    answer: 0,
  },
  {
    question: "Which algorithm is best suited for searching in a sorted array?",
    options: ["Binary Search", "Linear Search", "Depth First Search", "Breadth First Search"],
    answer: 0,
  },
  {
    question: "What is the purpose of hashing?",
    options: [
      "To sort data",
      "To search data in constant time",
      "To compress data",
      "To organize memory",
    ],
    answer: 1,
  },
  {
    question: "What does Big O notation describe?",
    options: [
      "The size of the array",
      "The number of loops in code",
      "The performance or complexity of an algorithm",
      "The output of a program",
    ],
    answer: 2,
  },
  {
    question: "Which traversal is used to print nodes in a binary tree in ascending order?",
    options: ["Pre-order", "Post-order", "In-order", "Level-order"],
    answer: 2,
  },
  {
    question: "Which algorithm is used in AI for searching?",
    options: ["DFS", "BFS", "A*", "Merge Sort"],
    answer: 2,
  },
];

function Algorithms() {
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
      if (selected === algorithmQuestions[current].answer) {
        setScore(score + 1);
      }
      setSelected(null);
      if (current + 1 < algorithmQuestions.length) {
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
        <p>Score: {(score / algorithmQuestions.length) * 100}%</p>
        <p>Correct Answers: {score}</p>
        <p>Time Taken: {60 - timeLeft}s</p>
        <p>Achievement: 🏅 Algorithm Challenger</p>
        <button onClick={() => window.location.reload()}>Retake Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Algorithms Basics</h2>
      <img src="https://i.ytimg.com/vi/kM9ASKAni_s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCmU51Gl813IISeDMy6ZcbNj43axw" alt="banner" />
      <p>Question {current + 1} of {algorithmQuestions.length}</p>
      <p>{algorithmQuestions[current].question}</p>
      <div className="options">
        {algorithmQuestions[current].options.map((option, index) => (
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

export default Algorithms;
