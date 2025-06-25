import React, { useState, useEffect, useRef } from 'react';
import './QuizFlow.css';


const PythonForBeginnersQuiz = () => {
  const quizTitle = "Python for Beginners";

  const questions = [
    {
      id: 1,
      question: "What is the correct file extension for Python files?",
      options: [".py", ".pt", ".pyt", ".python"],
      answer: 0,
    },
    {
      id: 2,
      question: "How do you insert comments in Python code?",
      options: ["// comment", "# comment", "/* comment */", "<!-- comment -->"],
      answer: 1,
    },
    {
      id: 3,
      question: "Which function is used to output data to the screen?",
      options: ["print()", "echo()", "console.log()", "write()"],
      answer: 0,
    },
    {
      id: 4,
      question: "Which of these is a Python data type?",
      options: ["Integer", "Float", "String", "All of the above"],
      answer: 3,
    },
    {
      id: 5,
      question: "What symbol is used to assign a value to a variable?",
      options: ["=", "==", ":=", "<-"],
      answer: 0,
    },
    {
      id: 6,
      question: "How do you create a list in Python?",
      options: ["[1, 2, 3]", "(1, 2, 3)", "{1, 2, 3}", "<1, 2, 3>"],
      answer: 0,
    },
    {
      id: 7,
      question: "Which keyword is used for conditional statements in Python?",
      options: ["if", "when", "case", "cond"],
      answer: 0,
    },
    {
      id: 8,
      question: "How do you start a function definition in Python?",
      options: ["function myFunc():", "def myFunc():", "func myFunc():", "define myFunc():"],
      answer: 1,
    },
    {
      id: 9,
      question: "What is the output of print(2 ** 3)?",
      options: ["6", "8", "9", "Error"],
      answer: 1,
    },
    {
      id: 10,
      question: "Which method adds an item to the end of a list?",
      options: [".append()", ".add()", ".insert()", ".push()"],
      answer: 0,
    },
  ];

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
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f4ff', padding: 20, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#3f51b5' }}>{quizTitle}</h2>
      <p style={{ textAlign: 'center' }}>🕒 Time Elapsed: <strong>{timeElapsed}s</strong></p>

      {!isSubmitted ? (
        <>
          <div>
            <h3 style={{ color: '#333' }}>
              Question {currentIndex + 1} of {questions.length}
            </h3>
            <p style={{ fontWeight: 'bold' }}>{questions[currentIndex].question}</p>
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
              ⬅️ Previous
            </button>{" "}
            <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
              Next ➡️
            </button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <h3>🏁 Quiz Completed!</h3>
          <p><strong>Your Score:</strong> {score} out of {questions.length}</p>
          <p><strong>Percentage:</strong> {((score / questions.length) * 100).toFixed(2)}%</p>
          <p><strong>Total Time:</strong> {timeElapsed} seconds</p>
        </div>
      )}
    </div>
  );
};

export default PythonForBeginnersQuiz;
