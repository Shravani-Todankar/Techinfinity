import React, { useEffect } from "react";
import "../App.css";
import { createInfinityGallery, initializeGSAPAnimation, initializeParallax } from "../script";

const SectionSix = () => {
  // Alternative approach: using require() or dynamic imports
  const getCustomImageData = () => {
    try {
      const images = [];
      for (let i = 1; i <= 24; i++) {
        try {
          // Try to dynamically require the image
          const imgSrc = require(`../assets/infinity2/${i}.jpg`);
          images.push({ src: imgSrc, alt: `Gallery Image ${i}` });
        } catch (error) {
          console.warn(`Image ${i}.jpg not found, using placeholder`);
          images.push({ 
            src: `https://picsum.photos/60/70?random=${i}`, 
            alt: `Placeholder Image ${i}` 
          });
        }
      }
      return images;
    } catch (error) {
      console.error('Error loading custom images:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log('SectionSix mounted');
    
    const customImageData = getCustomImageData();
    console.log('Generated custom image data:', customImageData);

    // Initialize section six animations with custom images
    const initializeSection = () => {
      const infinityShape = document.getElementById('infinityShape');
      if (!infinityShape) {
        console.error('infinityShape element not found when trying to initialize');
        return;
      }

      console.log('Initializing SectionSix with custom images');
      
      try {
        createInfinityGallery(customImageData); // Pass custom images
        initializeGSAPAnimation();
        initializeParallax();
        console.log('SectionSix initialization completed');
      } catch (error) {
        console.error('Error initializing SectionSix:', error);
      }
    };

    const timeoutId = setTimeout(initializeSection, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="section-six">
      <div className="infinity-shape" id="infinityShape"></div>
    </section>
  );
};

export default SectionSix;