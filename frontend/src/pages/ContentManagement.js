// src/pages/ContentManagement.js
import React, { useState } from "react";
import "./ContentManagement.css";

const ContentManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [contents, setContents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    question: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...contents];
      updated[editIndex] = formData;
      setContents(updated);
      setEditIndex(null);
    } else {
      setContents([...contents, formData]);
    }

    setFormData({ subject: "", topic: "", question: "" });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(contents[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = contents.filter((_, i) => i !== index);
    setContents(updated);
  };

  return (
    <div className="content-management-container">
      <div className="content-management-card">
        <h2>Content Management</h2>
        <p>Oversee quizzes and educational content across the platform.</p>

        {showForm ? (
          <form className="content-form" onSubmit={handleSubmit}>
            <h4>{editIndex !== null ? "Edit Content" : "Add New Quiz Content"}</h4>
            <input
              type="text"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
            <input
              type="text"
              placeholder="Topic"
              required
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            />
            <textarea
              placeholder="Question"
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            ></textarea>
            <div className="btn-group">
              <button type="submit" className="btn btn-success">
                {editIndex !== null ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditIndex(null);
                  setFormData({ subject: "", topic: "", question: "" });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button className="btn btn-success mt-3" onClick={() => setShowForm(true)}>
            Add New Content
          </button>
        )}

        {contents.length > 0 && (
          <div className="content-list mt-4">
            <h4>Quiz Content Table</h4>
            <table className="content-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Topic</th>
                  <th>Question</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((item, index) => (
                  <tr key={index}>
                    <td>{item.subject}</td>
                    <td>{item.topic}</td>
                    <td>{item.question}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(index)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
