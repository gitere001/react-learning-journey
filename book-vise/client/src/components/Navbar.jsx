import { Book, LogIn } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, loading, error } = useSelector((state) => state.userAuth);
  const navigate = useNavigate()
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div onClick={()=> navigate("/")} style={{cursor: "pointer"}} className="logo">
          <Book className="logo-icon" />
          <span className="logo-text">BookVerse</span>
        </div>
        <div className="nav-links">
        <Link to={"/"} href="#about" className="nav-item">
            Home
          </Link>


          <Link to={"/about"} href="#about" className="nav-item">
            About
          </Link>
          {!isLoggedIn && (
            <button onClick={()=> navigate('/login')} className="login-btn">
              <LogIn className="btn-icon" /> Login
            </button>
          )}
          {isLoggedIn && (
            <button className="login-btn">
              <LogIn className="btn-icon" /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
