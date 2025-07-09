import React, { useEffect } from "react";
import "../App.css";
import { initializeCounters } from "../script";

const SectionFive = () => {
  useEffect(() => {
    // Initialize counter animations
    initializeCounters();
  }, []);

    git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

  return (
    <section className="cloudy-effect">
      <section className="counter-section" id="counters">
        <div className="container">
          <div className="counters-grid">
            <div className="counter-item">
              <span className="counter-number" data-target="10">0</span>
              <div className="counter-label">Years of Services</div>
            </div>
            <div className="counter-item">
              <span className="counter-number" data-target="80">0</span>
              <div className="counter-label">Team Size</div>
            </div>
            <div className="counter-item">
              <span className="counter-number" data-target="100">0</span>
              <div className="counter-label">Client Satisfaction</div>
            </div>
            <div className="counter-item">
              <span className="counter-number" data-target="300">0</span>
              <div className="counter-label">Clients</div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SectionFive;