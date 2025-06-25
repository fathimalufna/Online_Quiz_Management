// src/pages/PythonDataAnalysisQuiz.js
import React, { useState, useEffect, useRef } from 'react';
import './QuizFlow.css';


const PythonDataAnalysisQuiz = () => {
  const quizTitle = "Python Data Analysis";

  const questions = [
    {
      id: 1,
      question: "Which library is commonly used for data manipulation in Python?",
      options: ["NumPy", "Matplotlib", "Pandas", "Seaborn"],
      answer: 2,
    },
    {
      id: 2,
      question: "Which function reads a CSV file in Pandas?",
      options: ["pandas.load_csv()", "pandas.read_csv()", "pandas.open_csv()", "pandas.import_csv()"],
      answer: 1,
    },
    {
      id: 3,
      question: "What is the output type of df[\"column_name\"] in Pandas?",
      options: ["DataFrame", "Series", "List", "Dictionary"],
      answer: 1,
    },
    {
      id: 4,
      question: "Which method returns the first 5 rows of a DataFrame?",
      options: ["df.head()", "df.first()", "df.preview()", "df.top()"],
      answer: 0,
    },
    {
      id: 5,
      question: "What does df.describe() do?",
      options: ["Shows summary statistics", "Deletes null rows", "Sorts values", "Renames columns"],
      answer: 0,
    },
    {
      id: 6,
      question: "Which library is built on top of Matplotlib for easier plotting?",
      options: ["Pandas", "Seaborn", "NumPy", "SciPy"],
      answer: 1,
    },
    {
      id: 7,
      question: "How do you get unique values of a column in Pandas?",
      options: ["df.unique()", "df.column.unique()", "df[\"col\"].unique()", "df.unique[\"col\"]"],
      answer: 2,
    },
    {
      id: 8,
      question: "Which function fills missing values in a DataFrame?",
      options: ["fillna()", "fill()", "replace_nulls()", "fixnulls()"],
      answer: 0,
    },
    {
      id: 9,
      question: "Which Pandas method removes rows with null values?",
      options: ["dropna()", "remove()", "drop()", "clear()"],
      answer: 0,
    },
    {
      id: 10,
      question: "Which function shows correlation between columns in a DataFrame?",
      options: ["df.compare()", "df.corr()", "df.relate()", "df.stats()"],
      answer: 1,
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
    <div style={{ maxWidth: 650, margin: 'auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9ff', padding: 30, borderRadius: 12, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>{quizTitle}</h2>
      <p style={{ textAlign: 'center' }}>🕒 Time Elapsed: <strong>{timeElapsed}s</strong></p>

      {!isSubmitted ? (
        <>
          <div>
            <h3 style={{ color: '#333' }}>Question {currentIndex + 1} of {questions.length}</h3>
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
                    />{' '}
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={handlePrevious} disabled={currentIndex === 0}>⬅️ Previous</button>
            <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>Next ➡️</button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <h3>🎉 Quiz Completed!</h3>
          <p><strong>Your Score:</strong> {score} / {questions.length}</p>
          <p><strong>Percentage:</strong> {((score / questions.length) * 100).toFixed(2)}%</p>
          <p><strong>Total Time:</strong> {timeElapsed} seconds</p>
        </div>
      )}
    </div>
  );
};

export default PythonDataAnalysisQuiz;
