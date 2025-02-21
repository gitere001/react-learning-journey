import "../App.css";
import Login from "./Login";

import HomePage from "./HomePage";

import { LoginContext } from "../context/AppState";
import { useContext } from "react";

export default function App() {
  const { loginState } = useContext(LoginContext);

  return (
    <>
      {!loginState.isAuthenicated && <Login />}
      {loginState.isAuthenicated && <HomePage />}
    </>
  );
}
