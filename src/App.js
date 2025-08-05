import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Service from "./services/Webservice";
import SeoServices from "./services/Seoservice";
import PMServices from "./services/PMservice";
import SMServices from "./services/SMservice";
import OurWorks from "./works/ourWorks";
import AboutUs from "./about/aboutUs";
import Careers from "./career/Careers";
import JobDetailPage from "./career/JobDetailModal.jsx";
import ContactUs from "./contact/ContactUs.jsx";
import LakmeGallery from "./services/Lakme"; // Import the Lakme component
import SectionOne from "./Home/SectionOne";
import SectionTwo from "./Home/SectionTwo";
import SectionThree from "./Home/SectionThree";
import SectionFour from "./Home/SectionFour";
import SectionFive from "./Home/SectionFive";
import FallingImages from "./Home/FallingImages";
// Logos
import WrognLogo from './assets/Falling-Logos/Wrogn.png';
import RapooLogo from './assets/Falling-Logos/Rapoo.png';
import MSLogo from './assets/Falling-Logos/MediSkin.png';
import MGLogo from './assets/Falling-Logos/MG-Group.png'
import MiraggioLogo from './assets/Falling-Logos/Miraggio.png';
import MILogo from './assets/Falling-Logos/MumbaiIndians.png';
import SarinSkinLogo from './assets/Falling-Logos/SarinSkin.png';
import OneMileLogo from './assets/Falling-Logos/Onemile.png';
import MonarchLogo from './assets/Falling-Logos/Monarch.png';
import TWSLogo from './assets/Falling-Logos/TWS.png';
import GuardianLogo from './assets/Falling-Logos/Guardian.png';
import MastMasalaLogo from './assets/Falling-Logos/MastMasala.png';
import IndianOilLogo from './assets/Falling-Logos/Indian-Oil.png';
import KFCLogo from './assets/Falling-Logos/KFC.png';
import TechnoboticsLogo from './assets/Falling-Logos/Technobotics.png';
import SalusLogo from './assets/Falling-Logos/Salus.png';
import DivaaLogo from './assets/Falling-Logos/Divaa.png';
import McCoyLogo from './assets/Falling-Logos/McCoy.png';
import ICICILogo from './assets/Falling-Logos/ICICI.png';
import BMLogo from './assets/Falling-Logos/BabyMoo.png';

import SectionSix from "./Home/SectionSix";
import SectionSeven from "./Home/SectionSeven";
import Footer from "./components/Footer";
import { initializeAllAnimations } from "./script";
import "./App.css";

// Component to handle scroll reset on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Home = () => {
  // Define your images array - replace with your actual image paths
  const companyImages = [
    { src: WrognLogo, alt: "WROGN", highlighted: false },
    { src: RapooLogo, alt: "Rapoo", highlighted: true },
    { src: MSLogo, alt: "MediSkin", highlighted: false },
    { src: MiraggioLogo, alt: "Miraggio", highlighted: true },
    { src: MILogo, alt: "Mumbai Indians", highlighted: false },
    { src: MGLogo, alt: "MG", highlighted: true },
    { src: SarinSkinLogo, alt: "SarinSkin", highlighted: false },
    { src: OneMileLogo, alt: "OneMile", highlighted: true },
    { src: MonarchLogo, alt: "Monarch", highlighted: false },
    { src: TWSLogo, alt: "TWS", highlighted: true },
    { src: GuardianLogo, alt: "Guardian", highlighted: false },
    { src: MastMasalaLogo, alt: "MastMasala", highlighted: true },
    { src: IndianOilLogo, alt: "Indian-Oil", highlighted: false },
    { src: KFCLogo, alt: "KFC", highlighted: true },
    { src: TechnoboticsLogo, alt: "Technobotics", highlighted: false },
    { src: SalusLogo, alt: "Salus", highlighted: true },
    { src: DivaaLogo, alt: "Divaa", highlighted: false },
    { src: McCoyLogo, alt: "McCoy", highlighted: true },
    { src: ICICILogo, alt: "ICICI", highlighted: false },
    { src: BMLogo, alt: "BabyMoo", highlighted: true },
  ];

  return (
    <>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <FallingImages
        images={companyImages}
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        mouseConstraintStiffness={0.9}
        imageWidth={80}
        imageHeight={60}
      />
      <SectionSix />
      <SectionSeven />
    </>
  );
};

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
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/web-development" element={<Service />} />
          <Route path="/seo" element={<SeoServices />} />
          <Route path="/performance-marketing" element={<PMServices />} />
          <Route path="/social-media" element={<SMServices />} />
          <Route path="/our-work" element={<OurWorks />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/job/:jobId" element={<JobDetailPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/lakme" element={<LakmeGallery />} /> {/* Add the new Lakme route */}
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