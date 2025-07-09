// Updated SectionOne.jsx
import React, { useEffect, useRef } from "react";
import "../App.css";
import { initInfinityAnimation } from "../script";

const SectionOne = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize the infinity animation
    initInfinityAnimation();
  }, []);

  return (
    <section id="section-one">
      <div id="container" ref={containerRef}>
        <div id="top-text"></div>
        <div id="infinity-container"></div>
        <div className="scroll-indicator">
          <span>Scroll to continue</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
