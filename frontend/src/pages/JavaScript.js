import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- NEW
import './QuizFlow.css';

const quizData = {
  id: 1,
  title: 'JavaScript Basics',
  description: 'Learn the fundamentals of JavaScript programming.',
  image: 'https://javascript.info/img/site_preview_en_1200x630.png',
  questions: [
    {
      question: 'What is the correct way to declare a variable in JavaScript?',
      options: ['var x = 10;', 'int x = 10;', 'let x := 10;', 'x := 10'],
      correct: 'var x = 10;',
    },
    {
      question: 'What is the output of console.log(typeof null)?',
      options: ['null', 'object', 'undefined', 'NaN'],
      correct: 'object',
    },
    {
      question: 'Which keyword is used to create a constant in JavaScript?',
      options: ['let', 'var', 'const', 'static'],
      correct: 'const',
    },
    {
      question: 'Which method is used to convert a string to an integer in JavaScript?',
      options: ['parseFloat()', 'Number()', 'parseInt()', 'toInteger()'],
      correct: 'parseInt()',
    },
    {
      question: 'How do you write a comment in JavaScript?',
      options: ['<!-- Comment -->', '# Comment', '// Comment', '** Comment **'],
      correct: '// Comment',
    },
    {
      question: 'Which symbol is used for strict equality in JavaScript?',
      options: ['==', '!=', '===', '='],
      correct: '===',
    },
    {
      question: 'Which of the following is a JavaScript data type?',
      options: ['float', 'integer', 'string', 'character'],
      correct: 'string',
    },
    {
      question: 'How do you create a function in JavaScript?',
      options: ['def myFunc()', 'function myFunc()', 'func myFunc()', 'function: myFunc()'],
      correct: 'function myFunc()',
    },
    {
      question: 'Which event occurs when the user clicks on an HTML element?',
      options: ['onhover', 'onchange', 'onmouseclick', 'onclick'],
      correct: 'onclick',
    },
    {
      question: 'What will be the output of: Boolean(0)?',
      options: ['true', 'false', 'undefined', 'NaN'],
      correct: 'false',
    },
  ],
};

export default function QuizFlow() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const navigate = useNavigate(); // <-- NEW

  useEffect(() => {
    if (showResult) return;
    if (timeLeft === 0) {
      setShowResult(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  const handleOptionSelect = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetake = () => {
    setSelectedOptions({});
    setCurrentQuestion(0);
    setShowResult(false);
    setTimeLeft(300);
  };

  const handleReturnToQuizzes = () => {
    navigate('/quizzes'); // <-- Redirect to Quizzes page
  };

  const correctAnswersCount = Object.keys(selectedOptions).filter(
    (key) => selectedOptions[key] === quizData.questions[key].correct
  ).length;

  const percentageScore = Math.round(
    (correctAnswersCount / quizData.questions.length) * 100
  );

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  if (showResult) {
    return (
      <div className="quiz-container result">
        <h2>🎉 Quiz Completed!</h2>
        <div className="score-box">{percentageScore}%</div>
        <p><strong>Correct Answers:</strong> {correctAnswersCount} / {quizData.questions.length}</p>
        <p><strong>Total Time Taken:</strong> {formatTime(300 - timeLeft)}</p>
        <div className="achievement">🏅 Achievement Unlocked!</div>
        <div className="btn-group" style={{ flexDirection: 'column', gap: '10px' }}>
          <button onClick={handleRetake}>Retake Quiz</button>
          <button onClick={handleReturnToQuizzes}>Return to Quizzes</button>
        </div>
      </div>
    );
  }

  const current = quizData.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h2>{quizData.title}</h2>
      <p className="progress">Question {currentQuestion + 1} of {quizData.questions.length}</p>
      <div className="timer">⏳ Time Left: {formatTime(timeLeft)}</div>
      <h3>{current.question}</h3>
      {current.options.map((option, i) => (
        <div
          key={i}
          className={`option ${selectedOptions[currentQuestion] === option ? 'selected' : ''}`}
          onClick={() => handleOptionSelect(option)}
        >
          {option}
        </div>
      ))}
      <div className="btn-group">
        <button onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</button>
        <button onClick={handleNext}>
          {currentQuestion === quizData.questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
