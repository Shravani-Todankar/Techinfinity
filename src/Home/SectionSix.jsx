import React, { useEffect } from "react";
import "../App.css";
import { createInfinityGallery, initializeGSAPAnimation, initializeParallax } from "../script";

const SectionSix = () => {
  useEffect(() => {
    // Initialize section six animations
    setTimeout(() => {
      createInfinityGallery();
      initializeGSAPAnimation();
      initializeParallax();
    }, 50);
  }, []);

  return (
    <section className="section-six">
      <div className="infinity-shape" id="infinityShape"></div>
    </section>
  );
};

export default SectionSix;