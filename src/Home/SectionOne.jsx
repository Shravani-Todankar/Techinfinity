import React, { useEffect, useRef } from "react";
import "../App.css";
import { initInfinityAnimation } from "../script";

// Import your specific images
import Project1 from '../assets/infinity1/1.jpg';
import Project2 from '../assets/infinity1/2.jpg';
import Project3 from '../assets/infinity1/3.jpg';
import Project4 from '../assets/infinity1/4.jpg';
import Project5 from '../assets/infinity1/5.jpg';
import Project6 from '../assets/infinity1/6.jpg';
import Project7 from '../assets/infinity1/7.jpg';
import Project8 from '../assets/infinity1/8.jpg';
import Project9 from '../assets/infinity1/9.jpg';
import Project10 from '../assets/infinity1/10.jpg';
import Project11 from '../assets/infinity1/11.jpg';
import Project12 from '../assets/infinity1/12.jpg';
import Project13 from '../assets/infinity1/13.jpg';
import Project14 from '../assets/infinity1/14.jpg';
import Project15 from '../assets/infinity1/15.jpg';
import Project16 from '../assets/infinity1/16.jpg';
import Project17 from '../assets/infinity1/17.jpg';
import Project18 from '../assets/infinity1/18.jpg';
import Project19 from '../assets/infinity1/19.jpg';
import Project20 from '../assets/infinity1/20.jpg';
import Project21 from '../assets/infinity1/21.jpg';
import Project22 from '../assets/infinity1/22.jpg';
import Project23 from '../assets/infinity1/23.jpg';
import Project24 from '../assets/infinity1/24.jpg';

const SectionOne = () => {
  const containerRef = useRef(null);

  // Your custom images array
  const customImages = [
    Project1,
    Project2,
    Project3,
    Project4,
    Project5,
    Project6,
    Project7,
    Project8,
    Project9,
    Project10,
    Project11,
    Project12,
    Project13,
    Project14,
    Project15,
    Project16,
    Project17,
    Project18,
    Project19,
    Project20,
    Project21,
    Project22,
    Project23,
    Project24,
  ];

  // Corresponding links for your projects
  const customLinks = [
    '/lakme',
    '/RapooMI', 
    '/kunuts',
    '/mast-masala',
    '/orra',
    '/web-development',
    '/seo',
    '/performance-marketing',
    '/social-media',
    '/our-work',
    '/about-us',
    '/contact-us',
    '/careers',
    '/portfolio/project-1',
    '/portfolio/project-2',
    '/portfolio/project-3',
    '/portfolio/project-4',
    '/portfolio/project-5',
    '/portfolio/project-6',
    '/portfolio/project-7',
    '/portfolio/project-8',
    '/portfolio/project-9',
    '/portfolio/project-10',
    '/portfolio/project-11',
  ];

  useEffect(() => {
    // Pass your custom images and links to the function
    initInfinityAnimation(customImages, customLinks);
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
