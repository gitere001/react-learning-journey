import { ArrowLeft, X } from "lucide-react";
import { ProfileContext } from "../../context/AppState";
import { useContext, useState } from "react";

export default function ChangePasswordModal() {
  const [feedback, setFeedback] = useState({ status: "success", message: "" });
  const [errors, setErrors] = useState({
    currentPassword: { isEmpty: false, errorMessage: "" },
    newPassword: { isEmpty: false, errorMessage: "" },
    confirmPassword: { isEmpty: false, errorMessage: "" },
  });

  const { loginState, profileDispatch } = useContext(ProfileContext);

  async function handleChangePassword(e) {
    e.preventDefault();

    // Extract and trim form data
    const dataObj = Object.fromEntries(new FormData(e.target));
    const data = Object.fromEntries(
      Object.entries(dataObj).map(([key, value]) => [key, value.trim()])
    );

    // Reset errors
    setErrors({
      currentPassword: { isEmpty: false, errorMessage: "" },
      newPassword: { isEmpty: false, errorMessage: "" },
      confirmPassword: { isEmpty: false, errorMessage: "" },
    });

    // Validate empty fields
    const emptyFields = {};
    if (!data.currentPassword) emptyFields.currentPassword = { isEmpty: true, errorMessage: "Current password is required" };
    if (!data.newPassword) emptyFields.newPassword = { isEmpty: true, errorMessage: "New password is required" };
    if (!data.confirmPassword) emptyFields.confirmPassword = { isEmpty: true, errorMessage: "Confirm password is required" };

    if (Object.keys(emptyFields).length > 0) {
      setErrors((prev) => ({ ...prev, ...emptyFields }));
      return;
    }

    // Validate matching passwords
    if (data.newPassword !== data.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: { isEmpty: false, errorMessage: "Passwords don't match" },
      }));
      return;
    }

    // Fetch users and validate current password
    const response = await fetch("/users.json");
    const users = await response.json();

    if (Array.isArray(users) && users.length > 0) {
      const user = users.find((user) => user.userName === loginState.userName);

      if (user) {
        if (user.password === data.currentPassword) {
          setFeedback({ status: "success", message: "Password updated successfully!" });
        } else {
          setFeedback({ status: "error", message: "Current password is incorrect!" });
        }
      } else {
        setFeedback({ status: "error", message: "User not found!" });
      }
    } else {
      setFeedback({ status: "error", message: "No users found" });
    }

    // Close modal on success
    setTimeout(() => {
      if (feedback.status === "success") {
        profileDispatch({ type: "close-profile-modal" });
      }
      setFeedback({ status: "success", message: "" });
    }, 2000);
  }

  return (
    <div className="profile-modal change-password-profile">
      {/* Feedback Message */}
      {feedback.message.length > 0 && (
        <div className={`feedbackMessage ${feedback.status === "success" ? "success-feedback" : "error-feedback"}`}>
          <p>{feedback.message}</p>
        </div>
      )}

      {/* Modal Header */}
      <h3 className="profile-heading">
        <span className="heading-text">Profile</span>
        <X onClick={() => profileDispatch({ type: "close-profile-modal" })} className="close-icon" />
      </h3>

      {/* Back to Profile */}
      <p onClick={() => profileDispatch({ type: "show-profile-modal" })} className="back-icon">
        <ArrowLeft className="back-arrow" /> <span>Back to Profile</span>
      </p>

      {/* Change Password Form */}
      <form onSubmit={handleChangePassword} className="change-password-form">

        {/* Current Password Field */}
        <fieldset className="change-password-inputs">
          <label htmlFor="current-password">Current Password</label>
          <input type="password" id="current-password" name="currentPassword" />
          {errors.currentPassword.isEmpty && <small className="change-password-error">{errors.currentPassword.errorMessage}</small>}
        </fieldset>

        {/* New Password Field */}
        <fieldset className="change-password-inputs">
          <label htmlFor="newPassword">New Password</label>
          <input type="password" id="newPassword" name="newPassword" />
          {(errors.newPassword.isEmpty || errors.confirmPassword.errorMessage) && (
            <small className="change-password-error">{errors.newPassword.errorMessage || errors.confirmPassword.errorMessage}</small>
          )}
        </fieldset>

        {/* Confirm Password Field */}
        <fieldset className="change-password-inputs">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />
          {(errors.confirmPassword.isEmpty || errors.confirmPassword.errorMessage) && (
            <small className="change-password-error">{errors.confirmPassword.errorMessage}</small>
          )}
        </fieldset>

        {/* Submit Button */}
        <button className="btn update-password-btn">Update Password</button>
      </form>
    </div>
  );
}
