import {  Edit2, Key, LogOut,  User, X } from "lucide-react";
import { ProfileContext } from "../../context/AppState";
import { useContext } from "react";

export default function ProfilesModal() {
  const { loginState, profileState, profileDispatch, loginDispatch } =
    useContext(ProfileContext);
  function handleUsenameUpdate(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("userName")
    if (username.trim() === '') {
      alert('username cannot be empty')
      return
    }
    loginDispatch({type: "save-username-update", payload: username})
    profileDispatch({type: "save-username-update"})


  }

  function handleLogout() {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("username")
    loginDispatch({type: "logout-user"})
  }
  return (
    <div className="profile-modal main-profile">
      <h3 className="profile-heading">
        <span className="heading-text">Profile</span>
        <X
          onClick={() => profileDispatch({ type: "close-profile-modal" })}
          className="close-icon"
        />
      </h3>
      <div className="profile-username">
        <i className="profile-user-icon">
          <User />
        </i>
        {!profileState.isUpdatingUsername ? (
          <div className="profile-username-actions">
            <span className="profile-username-title">
              {loginState.userName}
            </span>
            <Edit2
              onClick={() => profileDispatch({ type: "update-username" })}
              className="edit-icon"
            />
          </div>
        ) : <form className="update-username" onSubmit={handleUsenameUpdate}>
          <input type="text" name="userName" defaultValue={loginState.userName} />
          <button className="update-username-btn">save</button>
          </form>}
      </div>
      <button onClick={()=> profileDispatch({type: "change-password-modal"})} className="profile-btn change-password">
        <Key className="profile-btn-icon" /> Change Password
      </button>
      <button onClick={handleLogout} className="profile-btn log-out">
        <LogOut className="profile-btn-icon" /> Log Out
      </button>
    </div>
  );
}
