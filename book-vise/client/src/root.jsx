import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Navbar from "./components/Navbar";
import store from "./app/store";
import NavLinks from "./components/NavLinks";
import { useIsMobile } from "./components/useIsMobile";

// Create a wrapper component inside Provider
const RootComponent = () => {
  const isMobile = useIsMobile()
  const openMobileMenu = useSelector((state) => state.mobile.openMobileMenu);
  const showAuthModal = useSelector((state) => state.userAuth.showAuthModal);

  return (
    <>
      <div className={`overlay ${openMobileMenu ? "show-overlay" : ""}`}></div>
      { isMobile && <NavLinks />}
      {!showAuthModal && <Navbar />}
      <App />
    </>
  );
};

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RootComponent />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
