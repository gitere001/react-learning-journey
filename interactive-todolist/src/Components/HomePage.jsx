import Header from "./Header";
import MainHomePage from "./MainHomePage";
import { ProfileContext } from "../context/AppState";
import { useContext } from "react";
export default function HomePage() {
	const {profileState} = useContext(ProfileContext)
  return (
    <div className="home-page-container">
		<div className={`overly ${profileState.showOverly ? "show" : ""}`}></div>
      <Header />
      <MainHomePage />
    </div>
  );
}
