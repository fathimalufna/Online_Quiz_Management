import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateQuiz.css';

const CreateQuiz = () => {
  const { id } = useParams(); // id from URL (for edit)
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    },
  ]);

  // Load quiz data if editing
  useEffect(() => {
    if (id) {
      const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
      const quizToEdit = storedQuizzes.find((q) => q.id === Number(id));
      if (quizToEdit) {
        setQuizTitle(quizToEdit.title);
        setQuizDescription(quizToEdit.description);
        setQuestions(quizToEdit.questions);
      }
    }
  }, [id]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'questionText') {
      updatedQuestions[index].questionText = value;
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.split('-')[1]);
      updatedQuestions[index].options[optionIndex] = value;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = value;
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const quizData = {
      id: id ? Number(id) : Date.now(),
      title: quizTitle,
      description: quizDescription,
      questions,
    };

    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    if (id) {
      // update existing quiz
      const updatedQuizzes = storedQuizzes.map((quiz) =>
        quiz.id === Number(id) ? quizData : quiz
      );
      localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
      alert('Quiz successfully updated!');
    } else {
      // create new quiz
      storedQuizzes.push(quizData);
      localStorage.setItem('quizzes', JSON.stringify(storedQuizzes));
      alert('Quiz successfully created!');
    }

    navigate('/manage-quizzes');
  };

  return (
    <div className="create-quiz-container">
      <h2>{id ? 'Edit Quiz' : 'Create New Quiz'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Quiz Description"
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          required
        />

        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <h4>Question {index + 1}</h4>
            <input
              type="text"
              placeholder="Enter question"
              value={q.questionText}
              onChange={(e) =>
                handleQuestionChange(index, 'questionText', e.target.value)
              }
              required
            />
            {q.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) =>
                  handleQuestionChange(index, `option-${i}`, e.target.value)
                }
                required
              />
            ))}
            <input
              type="text"
              placeholder="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(index, 'correctAnswer', e.target.value)
              }
              required
            />
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          + Add Another Question
        </button>

        <button type="submit" className="btn btn-primary">
          {id ? 'Save Changes' : 'Upload Quiz'}
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
