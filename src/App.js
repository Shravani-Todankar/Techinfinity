import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Service from "./services/service"
import OurWorks from "./works/ourWorks";
import AboutUs from "./about/aboutUs";
import Careers from "./career/Careers";
import JobDetailPage from "./career/JobDetailModal.jsx";
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
    // Ensures title is set
    document.title = "Best Digital Marketing Service Provider Agency In Mumbai | Techinfinity";

    // Fix: Wait for window load before initializing animations
    const handleLoad = () => {
      initializeAllAnimations();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("load", handleLoad);
    }

    // Cleanup
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleLoad);
      }
    };
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
          <Route path="/careers" element={<Careers />} />
          <Route path="/job/:jobId" element={<JobDetailPage />} />
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