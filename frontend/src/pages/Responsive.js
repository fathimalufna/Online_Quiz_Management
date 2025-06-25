import React, { useState, useEffect, useRef } from 'react';
import './QuizFlow.css';


const ResponsiveDesignQuiz = () => {
  const quizTitle = "Responsive Design";

  const questions = [
    {
      id: 1,
      question: "What is responsive web design?",
      options: [
        "A design that changes layout based on device screen size",
        "A design that is only for mobile devices",
        "A design with fixed-width elements",
        "A design only using CSS Grid",
      ],
      answer: 0,
    },
    {
      id: 2,
      question: "Which CSS feature helps create flexible layouts?",
      options: ["Flexbox", "Tables", "Fixed positioning", "Floats"],
      answer: 0,
    },
    {
      id: 3,
      question: "What does the CSS media query '@media (max-width: 600px)' do?",
      options: [
        "Applies styles only if the viewport is 600px wide or less",
        "Applies styles to screens wider than 600px",
        "Applies styles to all devices",
        "Prevents styles on devices smaller than 600px",
      ],
      answer: 0,
    },
    {
      id: 4,
      question: "Which HTML tag helps control the viewport on mobile devices?",
      options: [
        "<meta name='viewport'>",
        "<viewport>",
        "<meta name='screen'>",
        "<meta content='device-width'>",
      ],
      answer: 0,
    },
    {
      id: 5,
      question: "What does 'fluid layout' mean?",
      options: [
        "Layout that adapts to screen size with relative units",
        "Layout with fixed pixel widths",
        "Layout with CSS Grid only",
        "Layout with fixed height elements",
      ],
      answer: 0,
    },
    {
      id: 6,
      question: "Which unit is relative and good for responsive typography?",
      options: ["em", "px", "pt", "cm"],
      answer: 0,
    },
    {
      id: 7,
      question: "What CSS property controls how images resize within containers?",
      options: [
        "max-width",
        "image-size",
        "resize-mode",
        "fit-content",
      ],
      answer: 0,
    },
    {
      id: 8,
      question: "Which framework is known for helping build responsive websites?",
      options: ["Bootstrap", "Laravel", "Django", "Flask"],
      answer: 0,
    },
    {
      id: 9,
      question: "How do you hide an element on screens smaller than 768px using CSS?",
      options: [
        "@media (max-width: 768px) { display: none; }",
        "display: none;",
        "visibility: hidden;",
        "@media (min-width: 768px) { display: none; }",
      ],
      answer: 0,
    },
    {
      id: 10,
      question: "What is the purpose of the 'viewport' meta tag in responsive design?",
      options: [
        "To control layout on mobile browsers",
        "To set background color",
        "To define fonts",
        "To link CSS files",
      ],
      answer: 0,
    },
  ];

  // Same quiz logic as previous

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

export default ResponsiveDesignQuiz;
