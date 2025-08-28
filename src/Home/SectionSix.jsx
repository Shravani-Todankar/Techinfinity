// import React, { useEffect } from "react";
// import "../App.css";
// import { createInfinityGallery, initializeGSAPAnimation, initializeParallax } from "../script";

// const SectionSix = () => {
//   useEffect(() => {
//     // Initialize section six animations
//     setTimeout(() => {
//       createInfinityGallery();
//       initializeGSAPAnimation();
//       initializeParallax();
//     }, 50);
//   }, []);

//   return (
//     <section className="section-six">
//       <div className="infinity-shape" id="infinityShape"></div>
//     </section>
//   );
// };

// export default SectionSix;

import React, { useEffect } from "react";
import "../App.css";
import { createInfinityGallery, initializeGSAPAnimation, initializeParallax } from "../script";

// Import your local images
import img1 from '../assets/infinity2/1.jpg';
import img2 from '../assets/infinity2/2.jpg';
import img3 from '../assets/infinity2/3.jpg';
import img4 from '../assets/infinity2/4.jpg';
import img5 from '../assets/infinity2/5.jpg';
import img6 from '../assets/infinity2/6.jpg';
import img7 from '../assets/infinity2/7.jpg';
import img8 from '../assets/infinity2/8.jpg';
import img9 from '../assets/infinity2/9.jpg';
import img10 from '../assets/infinity2/10.jpg';
import img11 from '../assets/infinity2/11.jpg';
import img12 from '../assets/infinity2/12.jpg';
import img13 from '../assets/infinity2/13.jpg';
import img14 from '../assets/infinity2/14.jpg';
import img15 from '../assets/infinity2/15.jpg';
import img16 from '../assets/infinity2/16.jpg';
import img17 from '../assets/infinity2/17.jpg';
import img18 from '../assets/infinity2/18.jpg';
import img19 from '../assets/infinity2/19.jpg';
import img20 from '../assets/infinity2/20.jpg';
import img21 from '../assets/infinity2/21.jpg';
import img22 from '../assets/infinity2/22.jpg';
import img23 from '../assets/infinity2/23.jpg';
import img24 from '../assets/infinity2/24.jpg';

const SectionSix = () => {
  // Create your custom image data array
  const customImageData = [
    { src: img1, alt: 'Gallery Image 1' },
    { src: img2, alt: 'Gallery Image 2' },
    { src: img3, alt: 'Gallery Image 3' },
    { src: img4, alt: 'Gallery Image 4' },
    { src: img5, alt: 'Gallery Image 5' },
    { src: img6, alt: 'Gallery Image 6' },
    { src: img7, alt: 'Gallery Image 7' },
    { src: img8, alt: 'Gallery Image 8' },
    { src: img9, alt: 'Gallery Image 9' },
    { src: img10, alt: 'Gallery Image 10' },
    { src: img11, alt: 'Gallery Image 11' },
    { src: img12, alt: 'Gallery Image 12' },
    { src: img13, alt: 'Gallery Image 13' },
    { src: img14, alt: 'Gallery Image 14' },
    { src: img15, alt: 'Gallery Image 15' },
    { src: img16, alt: 'Gallery Image 16' },
    { src: img17, alt: 'Gallery Image 17' },
    { src: img18, alt: 'Gallery Image 18' },
    { src: img19, alt: 'Gallery Image 19' },
    { src: img20, alt: 'Gallery Image 20' },
    { src: img21, alt: 'Gallery Image 21' },
    { src: img22, alt: 'Gallery Image 22' },
    { src: img23, alt: 'Gallery Image 23' },
    { src: img24, alt: 'Gallery Image 24' },
  ];

  useEffect(() => {
    // Initialize section six animations with custom images
    setTimeout(() => {
      createInfinityGallery(customImageData); // Pass custom images
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