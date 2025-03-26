import { Route, Routes } from "react-router-dom";
import "./App.css";
import { appRoutes } from "./appRoutes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
    <ScrollToTop/>
    <div className="main-container">
      <Routes>
        {appRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
    </div>
    </>
  );
}

export default App;
