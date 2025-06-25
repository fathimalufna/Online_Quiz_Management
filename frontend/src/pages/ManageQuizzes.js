import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageQuizzes.css';

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    setQuizzes(storedQuizzes);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
      setQuizzes(updatedQuizzes);
      localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    }
  };

  const handleEdit = (id) => {
    navigate(`/create-quiz`);
  };

  return (
    <div className="manage-quizzes-container">
      <h2>Manage Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <table className="manage-quizzes-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td>{quiz.title}</td>
                <td>{quiz.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(quiz.id)}
                  >
                    Edit
                  </button>{' '}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(quiz.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageQuizzes;
