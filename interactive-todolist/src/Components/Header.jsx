import "./Header.css";
import { User } from "lucide-react";
import { ProfileContext } from "../context/AppState";
import { useContext } from "react";
import ProfileModals from "./ProfileModals";

export default function Header() {
  const { profileDispatch } = useContext(ProfileContext);

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Todo List App</h1>
        <div
          onClick={() => profileDispatch({ type: "show-profile-modal" })}
          className="profile-icon"
        >
          <User />
        </div>
      </div>
      <ProfileModals />
    </header>
  );
}
