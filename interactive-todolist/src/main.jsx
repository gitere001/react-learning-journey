import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Components/App";
import AppState from "./context/AppState";

createRoot(document.getElementById("root")).render(
  <AppState>
    <App />
  </AppState>
);
