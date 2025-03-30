import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { appRoutes } from "./appRoutes";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/user/userSlice";

function App() {
  console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

  const { username, email, image } = useSelector((state) => state.userDetails);

  const [userEmail, setEmail] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchUser({ email: userEmail }));
    }
  }, [userEmail]);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <>
      <ScrollToTop />

      <div className="main-container">
        <Routes>
          {appRoutes.map((route) => {
            if ("requireAuth" in route) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    isLoggedIn ? (
                      <route.element
                        username={username}
                        email={email}
                        image={image}
                      />
                    ) : (
                      <Navigate replace to="/login" />
                    )
                  }
                />
              );
            } else {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element setEmail={setEmail} />}
                />
              );
            }
          })}
        </Routes>
      </div>
    </>
  );
}

export default App;
