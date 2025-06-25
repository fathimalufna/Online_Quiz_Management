import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Quizzes.css';

const assessments = [
  {
    id: 1,
    title: 'JavaScript Basics',
    description: 'Learn the fundamentals of JavaScript programming.',
    questions: 10,
    image: 'https://javascript.info/img/site_preview_en_1200x630.png',
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Deep dive into closures, async, and ES6+ features.',
    questions: 10,
    image: 'data:image/jpeg;base64,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',
  },
  {
    id: 3,
    title: 'React Fundamentals',
    description: 'Master React concepts and build dynamic UI.',
    questions: 10,
    image: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Faw3ofc8dmekid4ourweo.jpg',
  },
  {
    id: 4,
    title: 'React Hooks & Context',
    description: 'Understand hooks and state management in React.',
    questions: 10,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhFqEbRbT825q1mnxRVaWyEviRXe651fGc0w&s',
  },
  {
    id: 5,
    title: 'HTML & CSS Basics',
    description: 'Understand web design with HTML5 and CSS3.',
    questions: 10,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNCWp0PTX0PDRua2CXzgo7owJCLQEZ0qCm-Q&s',
  },
  {
    id: 6,
    title: 'Responsive Design',
    description: 'Build layouts that work on all devices.',
    questions: 10,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_pa2OR0YxBk3oNkZ2yhQ8L21wprefyqJcg&s',
  },
  {
    id: 7,
    title: 'Python for Beginners',
    description: 'Start your programming journey with Python.',
    questions: 10,
    image: 'https://i.ytimg.com/vi/s3KhqPjBPaQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDU0jwn4_Bp29UdCDMGlhDEOjVsZA',
  },
  {
    id: 8,
    title: 'Python Data Analysis',
    description: 'Learn data manipulation with Pandas and NumPy.',
    questions: 10,
    image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230510174745/Data-Analysis-with-Python.webp',
  },
  {
    id: 9,
    title: 'SQL Database Essentials',
    description: 'Learn to manage and query relational databases.',
    questions: 10,
    image: 'data:image/jpeg;base64,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',
  },
  {
    id: 10,
    title: 'Advanced SQL Queries',
    description: 'Write complex joins, subqueries, and window functions.',
    questions: 10,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFSF4cxtG8DaDp5mPooCR6uljDMD8hK0ncqQ&s',
  },
  {
    id: 11,
    title: 'Data Structures Intro',
    description: 'Fundamental concepts of data organization.',
    questions: 10,
    image: 'data:image/png;base64,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',
  },
  {
    id: 12,
    title: 'Algorithms Basics',
    description: 'Learn sorting, searching, and algorithm analysis.',
    questions: 10,
    image: 'https://i.ytimg.com/vi/kM9ASKAni_s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCmU51Gl813IISeDMy6ZcbNj43axw',
  },
];

const Quizzes = () => {
  
  const [questions, setQuestions] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);
  const [searchText, setSearchText] = useState(''); 
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const clearFilters = () => {
    setSearchText('');
    setSearchQuery('');
    setCategory('');
    setLevel('');
    setQuestions('');
    setDifficulty('');
  };
  const filteredAssessments = assessments.filter((a) => {
    const matchTitle = a.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchQuestions = questions ? a.questions === parseInt(questions) : true;
    return matchTitle && matchQuestions;
  });

  const visibleAssessments = filteredAssessments.slice(0, visibleCount);

  

  return (
    <div className="container py-5 available-assessments-page">
      <h2 className="text-center text-light mb-3">Available Qizzes</h2>
      <p className="text-center text-white mb-5">
        Discover and master new skills with our comprehensive assessment library.
      </p>

     
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search assessments by title, topic, or keyword..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="col-md-2 mb-3">
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="data">Data Science</option>
          </select>
        </div>

        <div className="col-md-2 mb-3">
          <select className="form-select" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="col-md-2 mb-3">
          <select className="form-select" value={questions} onChange={(e) => setQuestions(e.target.value)}>
            <option value="">Any Question</option>
            <option value="10">10 Questions</option>
            <option value="15">15 Questions</option>
            <option value="20">20 Questions</option>
          </select>
        </div>

        <div className="col-md-2 mb-3">
          <select className="form-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="col-12 d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={clearFilters}>Clear Filters</button>
          <button className="btn btn-primary" onClick={() => setSearchQuery(searchText)}>Search</button>
        </div>
      </div>

      <div className="row">
        {visibleAssessments.length > 0 ? (
          visibleAssessments.map((assessment) => (
            <div key={assessment.id} className="col-md-4 mb-4">
              <div className="card quiz-card h-100">
                <img
                  src={assessment.image}
                  className="card-img-top"
                  alt={assessment.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{assessment.title}</h5>
                  <p className="card-text">{assessment.description}</p>
                  <p className="text-muted">{assessment.questions} questions</p>
                  <Link to={`/assessments/${assessment.id}`} className="btn btn-primary mt-auto">
                    Start Quiz
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-white">No quiz found.</div>
        )}
      </div>

      {visibleCount < filteredAssessments.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-light"
            onClick={() => setVisibleCount((prev) => prev + 1)}
          >
            Load More Quizzes
          </button>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
