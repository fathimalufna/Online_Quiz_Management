// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import '../assets/style.css';

const featuredQuizzes = [
  {
    id: 1,
    title: 'JavaScript Basics',
    description: 'Learn the fundamentals of JavaScript programming.',
  },
  {
    id: 2,
    title: 'React Fundamentals',
    description: 'Master React concepts and build dynamic UI.',
  },
  {
    id: 3,
    title: 'HTML & CSS',
    description: 'Understand web design with HTML5 and CSS3.',
  },
   { // Added 3 more quizzes as per common interpretation of "additionally 3"
    id: 4,
    title: 'Python for Beginners',
    description: 'Start your programming journey with Python.',
  },
  {
    id: 5,
    title: 'SQL Database Essentials',
    description: 'Learn to manage and query relational databases.',
  },
  {
    id: 6,
    title: 'Data Structures Intro',
    description: 'Fundamental concepts of data organization.',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Student',
    quote: 'QuizApp helped me improve my skills with fun quizzes!',
  },
  {
    id: 2,
    name: 'Mark Smith',
    role: 'Teacher',
    quote: 'Creating quizzes and tracking progress is super easy.',
  },
  {
    id: 3,
    name: 'Sarah Lee',
    role: 'Student',
    quote: 'Love the instant feedback and interactive learning experience.',
  },
];

const faqItems = [
  {
    question: 'How do I create a quiz?',
    answer:
      'After registering, go to the quizzes section and click "Create Quiz". You can add questions and answers there.',
  },
  {
    question: 'Can I track my progress?',
    answer:
      'Yes! QuizApp automatically tracks your quiz results and progress over time.',
  },
  {
    question: 'Is QuizApp mobile-friendly?',
    answer:
      'Absolutely, you can use QuizApp on any device with a responsive design.',
  },
];

const learningMaterials = [
  {
    id: 1,
    title: 'MDN Web Docs: HTML',
    description: 'Comprehensive guide to HTML for web development.',
    link: '[https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)',
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq1MUWOIVx6W6WViSntXLVjW89J6MsqZ6Fmg&s',

    colorClass: 'bg-gradient-orange' // Custom class for styling
  },
  {
  id: 2,
  title: 'CSS-Tricks: Flexbox',
  description: 'Master Flexbox for flexible box layout with this definitive guide.',
  link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
  imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStwG2Qzuw9sjiK6ejFbAmIB2XhqgGqVpD4zg&s', // Updated image
  colorClass: 'bg-gradient-green'
},
 {
  id: 3,
  title: 'JavaScript.info Tutorial',
  description: 'Learn modern JavaScript from scratch or deepen your knowledge.',
  link: 'https://javascript.info/',
  imageSrc: 'https://javascript.info/img/site_preview_en_1200x630.png', // Updated image URL
  colorClass: 'bg-gradient-blue'
},
  {
  id: 4,
  title: 'React Official Documentation',
  description: 'The official guide to React, a JavaScript library for building UIs.',
  link: 'https://react.dev/learn',
  imageSrc: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Faw3ofc8dmekid4ourweo.jpg', // replaced image URL
  colorClass: 'bg-gradient-pink'
},
 {
  id: 5,
  title: 'W3Schools: SQL Tutorial',
  description: 'Learn SQL for interacting with databases.',
  link: 'https://www.w3schools.com/sql/',
  imageSrc: 'https://i.ytimg.com/vi/uG1oVbtroxY/mqdefault.jpg', // replaced image URL
  colorClass: 'bg-gradient-yellow'
},
 {
  id: 6,
  title: 'Python.org Tutorial',
  description: 'An informal introduction to the basic features of the Python language.',
  link: 'https://docs.python.org/3/tutorial/',
  imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv6oZdgJwd_sW8j-Rcddv_1EYcy8VomvY66A&s', // replaced image URL
  colorClass: 'bg-gradient-purple'
},
]; 

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
{/* Hero Section */}
<section
  className="py-5 text-center text-white"
  style={{
    backgroundColor: '#007bff', // fallback color
    backgroundImage: `url('data:image/jpeg;base64,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')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  }}
>
  <div className="container">
    <h1 className="display-4 fw-bold">Welcome to QuizApp</h1>
    <p className="lead mb-4">
      The ultimate interactive learning platform for students and teachers.
    </p>
 <Link to="/login" className="btn btn-light btn-lg me-3">
  Get Started
</Link>

<Link to="/quizzes" className="btn btn-outline-light btn-lg">
  Browse Quizzes
</Link>

  </div>
</section>

      {/* Why Choose QuizApp Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4 text-center">Why Choose QuizApp?</h2>
          <div className="row g-4">
            <FeatureCard
              icon="bi bi-joystick"
              title="Interactive Learning"
              description="Engage with quizzes designed to make learning fun and effective."
            />
            <FeatureCard
              icon="bi bi-bar-chart-line"
              title="Track Progress"
              description="Monitor your improvement with detailed performance reports."
            />
            <FeatureCard
              icon="bi bi-people"
              title="Collaboration"
              description="Work with peers and teachers to enhance your knowledge."
            />
            <FeatureCard
              icon="bi bi-award"
              title="Achievements"
              description="Earn badges and rewards as you master topics."
            />
            <FeatureCard
              icon="bi bi-phone"
              title="Mobile-Friendly"
              description="Access quizzes anytime, anywhere from your devices."
            />
            <FeatureCard
              icon="bi bi-lightning-charge"
              title="Instant Feedback"
              description="Get immediate results and explanations for every answer."
            />
          </div>
        </div>
      </section>

      {/* Featured Quizzes Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-center">Featured Quizzes</h2>
          <div className="row g-4">
            {featuredQuizzes.map(({ id, title, description }) => (
              <div key={id} className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text flex-grow-1">{description}</p>
                    <Link
                      to={`/quizzes`}
                      className="btn btn-primary mt-auto"
                    >
                      Take Quiz
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Learning Materials Section */}
<section className="py-5 bg-light">
  <div className="container">
    <h2 className="mb-4 text-center">Learning Materials</h2>
    <div className="row g-4">
      {learningMaterials.map(({ id, title, description, link, imageSrc, colorClass }) => (
        <div key={id} className="col-md-4">
          <div className={`card h-100 shadow-sm ${colorClass}`}>
            <img
              src={imageSrc.replace(/[\[\]]/g, '')}
              className="card-img-top"
              alt={title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{title}</h5>
              <p className="card-text flex-grow-1">{description}</p>
              <a
                href={link.replace(/[\[\]]/g, '')}
                className="btn btn-dark mt-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>





      

      {/* Testimonials Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4 text-center">What Our Users Say</h2>
          <div
            id="testimonialCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {testimonials.map(({ id, name, role, quote }, idx) => (
                <div
                  key={id}
                  className={`carousel-item text-center ${
                    idx === 0 ? 'active' : ''
                  }`}
                >
                  <blockquote className="blockquote">
                    <p className="mb-4 fst-italic">"{quote}"</p>
                    <footer className="blockquote-footer">
                      {name} <cite title="role">{role}</cite>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-center">Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
            {faqItems.map(({ question, answer }, idx) => (
              <div className="accordion-item" key={idx}>
                <h2 className="accordion-header" id={`heading${idx}`}>
                  <button
                    className={`accordion-button ${
                      idx !== 0 ? 'collapsed' : ''
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${idx}`}
                    aria-expanded={idx === 0 ? 'true' : 'false'}
                    aria-controls={`collapse${idx}`}
                  >
                    {question}
                  </button>
                </h2>
                <div
                  id={`collapse${idx}`}
                  className={`accordion-collapse collapse ${
                    idx === 0 ? 'show' : ''
                  }`}
                  aria-labelledby={`heading${idx}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">{answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="col-md-4 text-center">
      <div className="p-4 border rounded shadow-sm h-100">
        <i className={`${icon} fs-1 mb-3 text-primary`}></i>
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}
