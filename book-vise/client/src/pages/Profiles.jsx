import { Camera } from "lucide-react";
import "../styles/Profile.css";

function Profiles({ username, email, image }) {
  return (
    <div className="profile-container">
      <h2>Profiles</h2>

      <div className="profile-details">
        <div className="profile-img-wrapper">
          {!image ? (
            <Camera size={48} className="no-profile-img" />
          ) : (
            <img
              className="profile-image"
              src="https://images.pexels.com/photos/3771839/pexels-photo-3771839.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
          )}
        </div>
        <input className="update-image" type="button" value={"update image"} />
        <p className="profile-username">@{username}</p>
        <p className="profile-email">{email}</p>
      </div>
    </div>
  );
}

export default Profiles;
