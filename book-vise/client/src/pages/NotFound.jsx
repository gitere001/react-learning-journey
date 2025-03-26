import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, BookX } from 'lucide-react';
import '../styles/NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <BookX size={64} />
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Oops! It seems the page you're looking for has wandered off our shelves.
        </p>
        <button
          className="not-found-button"
          onClick={() => navigate('/')}
        >
          <Home size={20} />
          Return Home
        </button>
      </div>
      <div className="not-found-decoration">
        <div className="floating-book book1"></div>
        <div className="floating-book book2"></div>
        <div className="floating-book book3"></div>
      </div>
    </div>
  );
}

export default NotFound;