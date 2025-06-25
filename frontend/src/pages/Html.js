import React, { useState, useEffect, useRef } from 'react';

const HtmlCssBasicsQuiz = () => {
  const quizTitle = "HTML & CSS Basics";

  const questions = [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyperlinking Text Marking Language",
      ],
      answer: 0,
    },
    {
      id: 2,
      question: "Which HTML element is used for the largest heading?",
      options: ["<h1>", "<head>", "<header>", "<h6>"],
      answer: 0,
    },
    {
      id: 3,
      question: "What is the correct CSS syntax to change the text color to red?",
      options: [
        "color: red;",
        "{color: red;}",
        "text-color: red;",
        "font-color: red;",
      ],
      answer: 0,
    },
    {
      id: 4,
      question: "Which HTML attribute is used to define inline styles?",
      options: ["style", "class", "font", "styles"],
      answer: 0,
    },
    {
      id: 5,
      question: "How do you insert a comment in a CSS file?",
      options: [
        "// this is a comment",
        "/* this is a comment */",
        "<!-- this is a comment -->",
        "' this is a comment",
      ],
      answer: 1,
    },
    {
      id: 6,
      question: "Which property is used to change the background color in CSS?",
      options: ["background-color", "color", "bgcolor", "background"],
      answer: 0,
    },
    {
      id: 7,
      question: "How do you make a list that lists items with bullets?",
      options: ["<ul>", "<ol>", "<li>", "<dl>"],
      answer: 0,
    },
    {
      id: 8,
      question: "Which HTML element is used to specify a footer for a document or section?",
      options: ["<footer>", "<bottom>", "<section>", "<foot>"],
      answer: 0,
    },
    {
      id: 9,
      question: "What does CSS stand for?",
      options: [
        "Creative Style Sheets",
        "Colorful Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
      ],
      answer: 2,
    },
    {
      id: 10,
      question: "How do you select an element with id 'header' in CSS?",
      options: ["#header", ".header", "header", "*header"],
      answer: 0,
    },
  ];

  // Quiz logic & UI here (same as others)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    if (!isSubmitted) {
      timerRef.current = setInterval(() => setTimeElapsed(t => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isSubmitted]);

  const handleOptionChange = (index) => {
    const updated = [...selectedAnswers];
    updated[currentIndex] = index;
    setSelectedAnswers(updated);

    if (currentIndex === questions.length - 1) {
      handleSubmit(updated);
    }
  };

  const handleSubmit = (answers) => {
    clearInterval(timerRef.current);
    let sc = 0;
    answers.forEach((ans, i) => {
      if (ans === questions[i].answer) sc++;
    });
    setScore(sc);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>{quizTitle}</h2>
      <p>Time elapsed: {timeElapsed}s</p>
      {!isSubmitted ? (
        <>
          <div>
            <h3>
              Question {currentIndex + 1} of {questions.length}
            </h3>
            <p>{questions[currentIndex].question}</p>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {questions[currentIndex].options.map((opt, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${currentIndex}`}
                      value={i}
                      checked={selectedAnswers[currentIndex] === i}
                      onChange={() => handleOptionChange(i)}
                    />{" "}
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: 20 }}>
            <button onClick={handlePrevious} disabled={currentIndex === 0}>
              Previous
            </button>{" "}
            <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
              Next
            </button>
          </div>
        </>
      ) : (
        <div>
          <h3>Quiz Completed!</h3>
          <p>
            Your score: {score} out of {questions.length}
          </p>
          <p>Time taken: {timeElapsed} seconds</p>
        </div>
      )}
    </div>
  );
};

export default HtmlCssBasicsQuiz;
