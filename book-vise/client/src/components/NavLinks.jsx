import { useDispatch, useSelector } from "react-redux";
import { resetAuth, showAuthPage } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, X } from "lucide-react";
import { useIsMobile } from "./useIsMobile";
import { hideMobileMenu } from "../features/mobile-menu/mobileSlice";

function NavLinks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { isLoggedIn } = useSelector((state) => state.userAuth);

  const openMobileMenu = useSelector((state) => state.mobile.openMobileMenu);
  return (
    <div
      className={`nav-links ${isMobile ? "mobile-menu" : ""} ${
        openMobileMenu ? "show-mobile-menu" : ""
      }`}
    >
      {isMobile && (
        <i
          onClick={() => dispatch(hideMobileMenu())}
          className="close-mobile-menu"
        >
          <X />
        </i>
      )}
      <span
        onClick={() => {
          navigate(isLoggedIn ? "/dashboard" : "/");
          if (isMobile) dispatch(hideMobileMenu());
        }}
        className="nav-item"
      >
        Home
      </span>

      <span
        onClick={() => {
          navigate("/about");
          isMobile && dispatch(hideMobileMenu());
        }}
        className="nav-item"
      >
        About
      </span>
      <span
        onClick={() => {
          navigate("/profile");
          isMobile && dispatch(hideMobileMenu());
          !isLoggedIn && dispatch(showAuthPage())
        }}
        className="nav-item"
      >
        Profile
      </span>
      {!isLoggedIn && (
        <button
          onClick={() => {
            navigate("/login");
            isMobile && dispatch(hideMobileMenu());
            dispatch(showAuthPage());
          }}
          className="login-btn"
        >
          <LogIn className="btn-icon" /> Login
        </button>
      )}
      {isLoggedIn && (
        <button
          onClick={() => {
            dispatch(resetAuth());
            navigate("/login");
			isMobile && dispatch(hideMobileMenu());
            dispatch(showAuthPage());
          }}
          className="logou-btn"
        >
          <LogOut size={18} className="btn-icon" /> Logout
        </button>
      )}
    </div>
  );
}

export default NavLinks;
