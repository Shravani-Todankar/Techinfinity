import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Cursor from "./cursor";
import Header from "./components/Header";
import Service from "./services/service"
import OurWorks from "./works/ourWorks";
import AboutUs from "./about/aboutUs";
import SectionOne from "./Home/SectionOne";
import SectionTwo from "./Home/SectionTwo";
import SectionThree from "./Home/SectionThree";
import SectionFour from "./Home/SectionFour";
import SectionFive from "./Home/SectionFive";
import SectionSix from "./Home/SectionSix";
import SectionSeven from "./Home/SectionSeven";
import Footer from "./components/Footer";
import { initializeAllAnimations } from "./script";
import "./App.css";

// function App() {
//   useEffect(() => {
//     document.title = "Best Digital Marketing Service Provider Agency In Mumbai | Techinfinity";

//     // Initialize all animations and cleanup
//     const cleanup = initializeAllAnimations();

//     // Cleanup function
//     return cleanup;
//   }, []);

//   return (
//     <div className="App">
//       <Header />
//       <SectionOne />
//       <SectionTwo />
//       <SectionThree />
//       <SectionFour />
//       <SectionFive />
//       <SectionSix />
//       <SectionSeven />
//       <Footer />

//       {/* Go to top button */}
//       <button id="goToTopBtn" className="go-to-top" aria-label="Go to top">
//         <span className="icon">↑</span>
//       </button>
//     </div>
//   );
// }


const Home = () => (
  <>
    <SectionOne />
    <SectionTwo />
    <SectionThree />
    <SectionFour />
    <SectionFive />
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
        {/* <Cursor /> */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/our-works" element={<OurWorks />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* Add future routes for /clients, /about etc. */}
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
