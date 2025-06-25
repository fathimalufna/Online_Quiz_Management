import React, { useState, useEffect, useRef } from 'react';
import './QuizFlow.css';


const ReactHooksQuiz = () => {
  const quizTitle = "React Hooks & Context";

  const questions = [
    {
      id: 1,
      question: "What does the useState hook do?",
      options: [
        "Manages state in functional components",
        "Creates a new component",
        "Handles side effects",
        "Accesses the DOM",
      ],
      answer: 0,
    },
    {
      id: 2,
      question: "Which hook is used to perform side effects in functional components?",
      options: ["useState", "useEffect", "useContext", "useRef"],
      answer: 1,
    },
    {
      id: 3,
      question: "What is the purpose of the useContext hook?",
      options: [
        "To access the React context",
        "To handle local state",
        "To fetch data",
        "To manipulate refs",
      ],
      answer: 0,
    },
    {
      id: 4,
      question: "Which hook allows you to persist values across renders without causing re-renders?",
      options: ["useState", "useEffect", "useRef", "useMemo"],
      answer: 2,
    },
    {
      id: 5,
      question: "How do you provide a context to child components?",
      options: [
        "Using Context.Provider",
        "Using useContext hook",
        "Using Redux",
        "Using props",
      ],
      answer: 0,
    },
    {
      id: 6,
      question: "What hook is used to memoize expensive calculations?",
      options: ["useCallback", "useMemo", "useEffect", "useState"],
      answer: 1,
    },
    {
      id: 7,
      question: "How do you prevent a function from being recreated on every render?",
      options: ["useMemo", "useEffect", "useCallback", "useRef"],
      answer: 2,
    },
    {
      id: 8,
      question: "What hook should you use to manage forms?",
      options: ["useState", "useEffect", "useRef", "useReducer"],
      answer: 3,
    },
    {
      id: 9,
      question: "Which hook is recommended to fetch data in a component?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      answer: 0,
    },
    {
      id: 10,
      question: "What hook lets you subscribe to a value and update UI accordingly?",
      options: ["useEffect", "useState", "useContext", "useRef"],
      answer: 2,
    },
  ];

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Timer
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isSubmitted]);

  const handleOptionChange = (index) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentIndex] = index;
    setSelectedAnswers(updatedAnswers);

    // Auto-submit if last question
    if (currentIndex === questions.length - 1) {
      handleSubmit(updatedAnswers);
    }
  };

  const handleSubmit = (answers) => {
    clearInterval(timerRef.current);

    let newScore = 0;
    answers.forEach((ans, idx) => {
      if (ans === questions[idx].answer) newScore++;
    });
    setScore(newScore);

    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleRetake = () => {
    setSelectedAnswers(Array(questions.length).fill(null));
    setIsSubmitted(false);
    setCurrentIndex(0);
    setScore(0);
    setTimeElapsed(0);
  };

  // Render
  if (!isSubmitted) {
    return (
      <div className="quiz-container" style={{ maxWidth: 600, margin: 'auto', background: '#5a4fcf', color: '#fff', borderRadius: 8, padding: 20, fontFamily: 'Arial' }}>
        <h2>{quizTitle} Quiz</h2>
        <div style={{ marginBottom: 10 }}>
          Question {currentIndex + 1} of {questions.length}
        </div>

        <div style={{ marginBottom: 15, fontWeight: 'bold' }}>
          {questions[currentIndex].question}
        </div>

        <form>
          {questions[currentIndex].options.map((option, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <label>
                <input
                  type="radio"
                  name="option"
                  checked={selectedAnswers[currentIndex] === i}
                  onChange={() => handleOptionChange(i)}
                />{' '}
                {option}
              </label>
            </div>
          ))}
        </form>

        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handlePrevious} disabled={currentIndex === 0}>
            Previous
          </button>
          {currentIndex < questions.length - 1 && (
            <button onClick={handleNext} disabled={selectedAnswers[currentIndex] === null}>
              Next
            </button>
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          <small>Time Elapsed: {timeElapsed}s</small>
        </div>
      </div>
    );
  }

  // Result screen
  return (
    <div className="result-container" style={{ maxWidth: 600, margin: 'auto', background: '#5a4fcf', color: '#fff', borderRadius: 8, padding: 20, fontFamily: 'Arial' }}>
      <h2>Quiz Completed! 🏆</h2>
      <div style={{ fontSize: 48, fontWeight: 'bold', margin: '20px 0' }}>
        {(score / questions.length) * 100}%
      </div>
      <div>
        <p>Total Time Taken: {timeElapsed}s</p>
        <p>Difficulty: Medium</p>
        <p>Questions Attempted: {selectedAnswers.filter((a) => a !== null).length}</p>
        <p>Correct Answers: {score}</p>
      </div>
      <div style={{ marginTop: 20 }}>
        <button onClick={handleRetake} style={{ marginRight: 10 }}>
          Retake Quiz
        </button>
        <button onClick={() => window.location.href = '/dashboard'}>
          Back to Dashboard
        </button>
      </div>
      <div style={{ marginTop: 30, fontWeight: 'bold' }}>
        Your Achievement Unlocked! 🎉
      </div>
    </div>
  );
};

export default ReactHooksQuiz;
