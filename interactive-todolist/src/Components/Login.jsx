import { useContext, useState } from "react";
import "./Login.css";
import { LoginContext } from "../context/AppState";
const initialInputState = {
  userName: "",
  password: "",
  passwordError: null,
  userNameError: null,
  otherError: null,
};

export default function Login() {
  const { loginDispatch, ACTION } = useContext(LoginContext);
  const [detailsInput, setDetailsInput] = useState(initialInputState);


  async function handleLogin(e) {
    e.preventDefault();

    const response = await fetch("/users.json");
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      const user = data.find((user) => user.userName === detailsInput.userName);

      if (user) {
        if (user.password === detailsInput.password) {
          console.log("user is successful isAuthenicated");

          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("username", user.userName);

          setDetailsInput(initialInputState);
          loginDispatch({ type: ACTION.LOGINUSER, payload: user.userName });
        } else {
          setDetailsInput((prev) => ({
            ...prev,
            passwordError: "Wrong Password",
          }));
        }
      } else {
        setDetailsInput((prev) => ({
          ...prev,
          userNameError: "Invalid Username",
        }));
      }
    } else {
      setDetailsInput((prev) => ({
        ...prev,
        otherError: "something Happened",
      }));
    }
  }
  return (
    <div className="login-container">
      <h2>Sign In to Your Tasks Hub</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <fieldset>
          <label htmlFor="username">UserName</label>
          <input
            value={detailsInput.userName}
            onChange={(e) =>
              setDetailsInput((prev) => ({ ...prev, userName: e.target.value }))
            }
            type="text"
            name="username"
            placeholder="e.g gitere001"
            required
          />
          <div className="error">
            {detailsInput.userNameError ? (
              <div className="error">
                <small>{detailsInput.userNameError}</small>
              </div>
            ) : null}
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            value={detailsInput.password}
            onChange={(e) =>
              setDetailsInput((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            name="password"
            required
          />
          {detailsInput.passwordError ? (
            <div className="error">
              <small>{detailsInput.passwordError}</small>
            </div>
          ) : null}
        </fieldset>
        <button type="submit" className="btn login">
          Login
        </button>
      </form>
    </div>
  );
}
