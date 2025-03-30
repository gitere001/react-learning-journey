import React from "react";
import { BookOpen, Compass, Users, Star } from "lucide-react";
import "../styles/about.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showAuthPage } from "../features/auth/authSlice";

const About = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="about-title">BookVerse</h1>
        <p className="about-subtitle">
          Your Personal Literary Journey Companion
        </p>
      </div>

      <div className="about-content">
        <div className="about-mission">
          <h2>Our Mission</h2>
          <p>
            BookVerse is your personal companion for book discovery, reading
            tracking, and literary exploration. We believe in creating a space
            where readers can connect with books like never before, transforming
            the way you experience literature.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <BookOpen className="feature-icon" />
            <h3>Track Your Reading</h3>
            <p>
              Keep a detailed log of your reading journey, set goals, and
              celebrate your literary achievements.
            </p>
          </div>

          <div className="feature-card">
            <Compass className="feature-icon" />
            <h3>Discover New Worlds</h3>
            <p>
              Explore curated recommendations and find your next favorite book
              through our intelligent discovery system.
            </p>
          </div>

          <div className="feature-card">
            <Users className="feature-icon" />
            <h3>Connect with Readers</h3>
            <p>
              Join a community of book lovers, share reviews, and participate in
              meaningful literary discussions.
            </p>
          </div>

          <div className="feature-card">
            <Star className="feature-icon" />
            <h3>Personalized Experience</h3>
            <p>
              Get tailored book recommendations based on your reading history
              and preferences.
            </p>
          </div>
        </div>

        <div className="about-cta">
          <h2>Start Your Reading Journey Today</h2>
          <p>
            Join thousands of readers who have transformed their reading
            experience with BookVerse.
          </p>
          {!isLoggedIn && (
            <button onClick={() => {navigate("/signup"); dispatch(showAuthPage())}} className="cta-button">
              Get Started
            </button>
          )}
        </div>
      </div>

      <div className="about-stats">
        <div className="stat-item">
          <span className="stat-number">50K+</span>
          <span className="stat-label">Active Readers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">1M+</span>
          <span className="stat-label">Books Tracked</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100K+</span>
          <span className="stat-label">Reviews</span>
        </div>
      </div>
    </div>
  );
};

export default About;
