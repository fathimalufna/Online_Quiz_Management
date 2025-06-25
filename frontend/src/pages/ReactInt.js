import React, { useState, useEffect, useRef } from 'react';
import './QuizFlow.css';


const ReactFundamentalsQuiz = () => {
  const quizTitle = "React Fundamentals";

  const questions = [
    {
      id: 1,
      question: "What is JSX?",
      options: [
        "JavaScript XML",
        "JavaScript Syntax Extension",
        "Both A and B",
        "None of the above",
      ],
      answer: 2,
    },
    {
      id: 2,
      question: "How do you create a React component?",
      options: [
        "Using a function or class",
        "Using HTML only",
        "Using CSS",
        "Using jQuery",
      ],
      answer: 0,
    },
    {
      id: 3,
      question: "Which method is used to render React elements into the DOM?",
      options: ["ReactDOM.render()", "renderDOM()", "render()", "React.render()"],
      answer: 0,
    },
    {
      id: 4,
      question: "What is the purpose of state in React?",
      options: [
        "To store data",
        "To update the DOM",
        "To manage dynamic data in components",
        "To style components",
      ],
      answer: 2,
    },
    {
      id: 5,
      question: "What is a prop in React?",
      options: [
        "A way to pass data to components",
        "A way to store local component data",
        "A type of event",
        "A React lifecycle method",
      ],
      answer: 0,
    },
    {
      id: 6,
      question: "How do you pass data from a parent to a child component?",
      options: ["Using props", "Using state", "Using context", "Using hooks"],
      answer: 0,
    },
    {
      id: 7,
      question: "Which lifecycle method runs after the component is mounted?",
      options: [
        "componentDidMount",
        "componentWillMount",
        "componentWillUnmount",
        "componentDidUpdate",
      ],
      answer: 0,
    },
    {
      id: 8,
      question: "What does 'virtual DOM' mean?",
      options: [
        "An in-memory representation of the real DOM",
        "A new DOM API",
        "A CSS framework",
        "A browser extension",
      ],
      answer: 0,
    },
    {
      id: 9,
      question: "How do you handle events in React?",
      options: [
        "Using camelCase event handlers",
        "Using lowercase event handlers",
        "Using inline HTML attributes",
        "Using jQuery events",
      ],
      answer: 0,
    },
    {
      id: 10,
      question: "Which of these is used to conditionally render elements?",
      options: ["Ternary operators", "Loops", "Functions", "Variables"],
      answer: 0,
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
    // Start timer when component mounts and not submitted
    if (!isSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isSubmitted]);

  // Handle answer selection
  const handleOptionChange = (index) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentIndex] = index;
    setSelectedAnswers(updatedAnswers);

    // If last question, auto-submit
    if (currentIndex === questions.length - 1) {
      handleSubmit(updatedAnswers);
    }
  };

  const handleSubmit = (answers) => {
    // Stop timer
    clearInterval(timerRef.current);

    // Calculate score
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

export default ReactFundamentalsQuiz;
