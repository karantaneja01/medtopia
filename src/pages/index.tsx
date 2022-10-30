import type { NextPage } from "next";
import Navbar from "../components/Global/Navbar";
import LandingPage from "../components/Global/HomeLogin";

const Home: NextPage = () => {
  return (
    <div className="h-full">
      <LandingPage />
    </div>
  );
};

export default Home;
