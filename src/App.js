import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Service from "./services/service"
import OurWorks from "./works/ourWorks";
import AboutUs from "./about/aboutUs";
import SectionOne from "./Home/SectionOne";
import SectionTwo from "./Home/SectionTwo";
import SectionThree from "./Home/SectionThree";
import SectionFour from "./Home/SectionFour";
import SectionFive from "./Home/SectionFive";
import FallingText from "./Home/FallingText";
import SectionSix from "./Home/SectionSix";
import SectionSeven from "./Home/SectionSeven";
import Footer from "./components/Footer";
import { initializeAllAnimations } from "./script";
import "./App.css";

const Home = () => (
  <>
    <SectionOne />
    <SectionTwo />
    <SectionThree />
    <SectionFour />
    <SectionFive />
    <FallingText
      text={`WROGN QUDICH Intellve Sarvatra DermaMD MG Godrej MSwipe TimeStone ORRA Kunuts Sereki JKShah Swaaha`}
      highlightWords={["QUDICH", "Sarvatra", "MG", "MSwipe", "ORRA", "Sereki", "Swaaha"]}
      highlightClass="highlighted"
      trigger="hover"
      backgroundColor="transparent"
      wireframes={false}
      gravity={0.56}
      fontSize="1rem"
      mouseConstraintStiffness={0.9}
    />
    <SectionSix />
    <SectionSeven />
  </>
);

function App() {
  useEffect(() => {
    document.title = "Best Digital Marketing Service Provider Agency In Mumbai | Techinfinity";
    const cleanup = initializeAllAnimations();
    return cleanup;
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/our-works" element={<OurWorks />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <Footer />
        <button id="goToTopBtn" className="go-to-top" aria-label="Go to top">
          <span className="icon">↑</span>
        </button>
      </div>
    </Router>
  );
}


export default App;
