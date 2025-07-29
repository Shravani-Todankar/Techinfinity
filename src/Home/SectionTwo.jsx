import React, { useEffect } from "react";
import "../App.css";
import Cursor from "../cursor";
import { initializeSecondSection, initializeCircleRingAnimation } from "../script";

const SectionTwo = () => {
  useEffect(() => {
    // Initialize circle ring animation
    initializeCircleRingAnimation();

    // Note: initializeSecondSection is called automatically from the scroll transition
    // in the main infinity animation sequence
  }, []);

  return (
    <section id="section-two">
      <div className="dm-zoom-reveal-wrapper-2">
        <Cursor />
        <div className="e-con-inner">
          <div className="circle-ring"></div>
          <div className="circle-ring inner-ring-1"></div>
          <div className="circle-ring inner-ring-2"></div>
          <div className="circle-ring inner-ring-3"></div>

          {[1015, 1016, 1020, 1024, 1027, 1033, 1035, 1037, 1040].map((id, i) => (
            <img
              key={i}
              className="dm-zoom-reveal-img-2"
              src={`https://picsum.photos/id/${id}/800/600`}
              alt={`Image ${i + 1}`}
            />
          ))}

          {/* Background video - with autoplay for visual effect */}
          <div className="center-video">
            <iframe
              src="https://www.youtube.com/embed/n9yh-saRjbg?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=n9yh-saRjbg&modestbranding=1&disablekb=1&fs=0&playsinline=1"
              title="Background Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>

          <div className="video-overlay" id="videoOverlay">
            <button
              className="play-button"
              id="playButton"
              aria-label="Play showreel video"
            >
              <div className="play-icon"></div>
              <span className="play-text">PLAY SHOWREEL</span>
            </button>
          </div>
        </div>

        <div className="center-text">
          <i>Blending</i> Strategy and<br />
          Creativity for <i>Infinite</i><br />
          Marketing Possibilities.
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;