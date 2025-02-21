import ProfilesModal from "./profilesModals/ProfilesModal";
import ChangePasswordModal from "./profilesModals/ChangePasswordModal";
import { ProfileContext } from "../context/AppState";
import "./ProfileModals.css";
import { useContext } from "react";



export default function ProfileModals() {
  const {profileState} = useContext(ProfileContext)
  return (
    <div className={`profile-modals-container ${profileState.showProfileModal ? "show-profile-modal":""}`}>
      {profileState.activeProfileModal === "profilemodal" && <ProfilesModal />}
      {profileState.activeProfileModal === "changepassword" && <ChangePasswordModal/>}
    </div>
  );
}
