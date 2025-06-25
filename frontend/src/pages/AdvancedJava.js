import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router v6

const quizData = {
  id: 2,
  title: "Advanced JavaScript",
  description: "Deep dive into closures, async, and ES6+ features.",
  questions: [
    {
      id: 1,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
      answer: "var myVar;"
    },
    {
      id: 2,
      question: "What is the output of console.log(typeof null)?",
      options: ["object", "null", "undefined", "boolean"],
      answer: "object"
    },
    {
      id: 3,
      question: "Which keyword is used to define an asynchronous function?",
      options: ["async", "await", "defer", "promise"],
      answer: "async"
    },
    {
      id: 4,
      question: "What will be the output of: `console.log(0.1 + 0.2 === 0.3);`?",
      options: ["true", "false", "undefined", "TypeError"],
      answer: "false"
    },
    {
      id: 5,
      question: "Which of the following methods is used to create a new array with all elements that pass a test?",
      options: [".map()", ".filter()", ".reduce()", ".forEach()"],
      answer: ".filter()"
    },
    {
      id: 6,
      question: "What is a closure in JavaScript?",
      options: [
        "A function having access to the parent scope, even after the parent function has closed",
        "A way to close windows",
        "A loop inside a function",
        "An error handler"
      ],
      answer: "A function having access to the parent scope, even after the parent function has closed"
    },
    {
      id: 7,
      question: "Which of the following is NOT a primitive data type in JavaScript?",
      options: ["string", "number", "object", "boolean"],
      answer: "object"
    },
    {
      id: 8,
      question: "What does the 'this' keyword refer to in an arrow function?",
      options: [
        "The global object",
        "The arrow function itself",
        "The enclosing lexical context's 'this'",
        "Undefined"
      ],
      answer: "The enclosing lexical context's 'this'"
    },
    {
      id: 9,
      question: "What will be logged to the console? `console.log([...'abc']);`",
      options: [
        "['abc']",
        "['a', 'b', 'c']",
        "['a,b,c']",
        "Error"
      ],
      answer: "['a', 'b', 'c']"
    },
    {
      id: 10,
      question: "Which Promise method handles both success and failure cases?",
      options: [".then()", ".catch()", ".finally()", ".all()"],
      answer: ".finally()"
    }
  ],
  difficulty: "Medium"
};

export default function AdvancedJavaScriptQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds

  const questions = quizData.questions;

  // Timer countdown effect
  useEffect(() => {
    if (showResults) return; // Stop timer after results

    if (timeLeft <= 0) {
      // Auto-submit quiz when timer ends
      setShowResults(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, showResults]);

  function handleOptionChange(e) {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: e.target.value,
    });
  }

  function goNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function goPrev() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function calculateScore() {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedOptions[idx] === q.answer) {
        score++;
      }
    });
    return score;
  }

  function handleSubmit() {
    setShowResults(true);
  }

  function handleRetake() {
    setSelectedOptions({});
    setCurrentQuestion(0);
    setShowResults(false);
    setTimeLeft(300);
  }

  function handleBackToDashboard() {
    // Navigate to Quizzes page (change path if needed)
    navigate("/quizzes");
  }

  const totalQuestions = questions.length;
  const attemptedQuestions = Object.keys(selectedOptions).length;
  const correctAnswers = calculateScore();
  const scorePercent = ((correctAnswers / totalQuestions) * 100).toFixed(0);
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);

  // Format timeLeft mm:ss
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{quizData.title}</h1>
      <p style={styles.description}>{quizData.description}</p>
      {!showResults ? (
        <div style={styles.card}>
          <div style={{ ...styles.header, marginBottom: 10 }}>
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span style={{ float: "right", fontWeight: "700" }}>
              Time Left: {minutes}:{seconds}
            </span>
          </div>
          <div style={styles.questionSection}>
            <h3 style={styles.question}>{questions[currentQuestion].question}</h3>
            <form>
              {questions[currentQuestion].options.map((option, idx) => (
                <label key={idx} style={styles.optionLabel}>
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={selectedOptions[currentQuestion] === option}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              ))}
            </form>
          </div>
          <div style={styles.navButtons}>
            <button onClick={goPrev} disabled={currentQuestion === 0} style={styles.button}>
              Previous
            </button>
            {currentQuestion < totalQuestions - 1 ? (
              <button
                onClick={goNext}
                disabled={selectedOptions[currentQuestion] == null}
                style={styles.button}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={selectedOptions[currentQuestion] == null}
                style={styles.button}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={styles.resultsCard}>
          <h2>Quiz Completed! 🎉</h2>
          <div style={styles.scoreBox}>
            <strong>Score: {scorePercent}%</strong>
          </div>
          <div style={styles.stats}>
            <p><strong>Total Time Taken:</strong> {totalTime} seconds</p>
            <p><strong>Difficulty:</strong> {quizData.difficulty}</p>
            <p><strong>Questions Attempted:</strong> {attemptedQuestions} / {totalQuestions}</p>
            <p><strong>Correct Answers:</strong> {correctAnswers}</p>
          </div>
          <div style={styles.actions}>
            <button onClick={handleRetake} style={styles.button}>
              Retake Quiz
            </button>
            <button
              onClick={handleBackToDashboard}
              style={styles.button}
            >
              Back to Dashboard
            </button>
          </div>
          <div style={{ marginTop: 20 }}>
            <strong>Your Achievement Unlocked!</strong>
            <p>Keep up the great work and improve your skills!</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: 600,
    margin: "40px auto",
    padding: 20,
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    borderRadius: 10,
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: 5,
  },
  description: {
    textAlign: "center",
    marginBottom: 25,
    fontStyle: "italic",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    padding: 20,
  },
  header: {
    fontWeight: "600",
    fontSize: 16,
  },
  questionSection: {
    marginBottom: 20,
  },
  question: {
    marginBottom: 15,
  },
  optionLabel: {
    display: "block",
    marginBottom: 10,
    cursor: "pointer",
    userSelect: "none",
  },
  navButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "10px 20px",
    borderRadius: 5,
    border: "none",
    backgroundColor: "#764ba2",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  resultsCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    padding: 25,
    textAlign: "center",
  },
  scoreBox: {
    margin: "20px auto",
    padding: 15,
    width: 120,
    borderRadius: "50%",
    backgroundColor: "#764ba2",
    fontSize: 28,
  },
  stats: {
    textAlign: "left",
    marginTop: 10,
    lineHeight: 1.5,
  },
  actions: {
    marginTop: 25,
    display: "flex",
    justifyContent: "center",
    gap: 15,
  },
};
