import { Book, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useIsMobile } from "./useIsMobile";
import NavLinks from "./NavLinks";
import { showMobileMenu } from "../features/mobile-menu/mobileSlice";

function Navbar() {
  const isMobile = useIsMobile();

  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div
          onClick={() => {
            isLoggedIn ? navigate("/dashboard") : navigate("/");
          }}
          style={{ cursor: "pointer" }}
          className="logo"
        >
          <Book className="logo-icon" />
          <span className="logo-text">BookVerse</span>
        </div>
        {!isMobile ? (
          <>
            <NavLinks />
          </>
        ) : (
          <Menu onClick={() => dispatch(showMobileMenu())} />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
