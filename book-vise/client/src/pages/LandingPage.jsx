import React from "react";
import { Book, ChevronRight, LogIn, Users, Search, Star } from "lucide-react";
import "../styles/BookVerseLanding.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showAuthPage } from "../features/auth/authSlice";

function BookVerseLanding() {
  // const { isLoggedIn, loading, error } = useSelector((state) => state.userAuth);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover, Track, and Explore Your Reading Journey
          </h1>
          <p className="hero-description">
            BookVerse is your personal companion for book discovery, reading
            tracking, and literary exploration. Connect with books like never
            before.
          </p>
          <div className="hero-buttons">
            <button onClick={()=> {navigate("/signup"); dispatch(showAuthPage())}} className="primary-btn">
              Get Started <ChevronRight className="btn-icon" />
            </button>
            <button onClick={()=> navigate('/about')} className="secondary-btn">Learn More</button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-content">
          <h2 className="section-title">What Makes BookVerse Special</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Search className="feature-icon" />
              <h3 className="feature-title">Discover Books</h3>
              <p className="feature-text">
                Explore a vast library of books across all genres and find your
                next great read.
              </p>
            </div>
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3 className="feature-title">Community Insights</h3>
              <p className="feature-text">
                Connect with fellow readers, share reviews, and get personalized
                recommendations.
              </p>
            </div>
            <div className="feature-card">
              <Star className="feature-icon" />
              <h3 className="feature-title">Track Your Progress</h3>
              <p className="feature-text">
                Monitor your reading goals, save favorite books, and track your
                literary journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Dive into Your Reading Adventure?
          </h2>
          <p className="cta-text">
            Join BookVerse today and transform the way you discover, read, and
            engage with books.
          </p>
          <div className="cta-buttons">
            <button onClick={()=> {navigate('/signup'); dispatch(showAuthPage())}} className="primary-btn">Create Free Account</button>
            <button onClick={()=> navigate('/about')} className="secondary-btn">Learn More</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <Book className="logo-icon" />
              <span className="logo-text">BookVerse</span>
            </div>
            <p className="footer-text">
              Your ultimate platform for book discovery and reading tracking.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to={"/"} className="footer-link">
                  Home
                </Link>
              </li>

              <li>
                <Link to={"/login"} className="footer-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to={"/signup"} className="footer-link">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Connect With Us</h4>
            <p className="footer-text">
              Stay updated with the latest from BookVerse
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 BookVerse. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default BookVerseLanding;
