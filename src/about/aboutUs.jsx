import React, { useEffect, useRef } from 'react';
import './about.css';
import { initAboutAnimations } from './about.js';
import DeveloperCarousel from "./Developercarousel.jsx"
import SeoCarousel from "./SeoCarousel";
import GraphicCarousel from "./GraphicCarousel";
import CsCarousel from "./CsCarousel";
import icon from "../assets/achievementicon.png";
import d1 from "../assets/directors-temp.jpg";
import Contactform from "../works/form.jsx";

const About = () => {
  // Refs for animation targets
  const storyRef = useRef(null);
  const journeyRef = useRef(null);
  const futureRef = useRef(null);
  const achievementsRef = useRef(null);
  const teamRef = useRef(null);
  const dreamRef = useRef(null);
  const directorRef = useRef(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      const animationContext = initAboutAnimations({
        storyRef,
        journeyRef,
        futureRef,
        achievementsRef,
        teamRef,
        dreamRef,
        directorRef
      });
  
      return () => {
        if (animationContext) animationContext.revert();
      };
    });
  }, []);
  

  return (
    <>
      <div className="about-container">
        {/* Our Story Section */}
        <div className="story-section">
          <div className="story-content" ref={storyRef}>
            <h1>Our <em>Story</em></h1>
            <h3>Introduction</h3>
            <p>In 2016, three friends—Hemant Shah, Ronak Parikh, and Omkar Pai—embarked on an ambitious entrepreneurial journey. Fresh out of engineering, they founded Techinfinity, a website development and design agency, registered under GfxBandits IT Solutions LLP.
              With an unshakeable passion, they transformed Techinfinity into a full-fledged digital marketing agency specializing in SEO, performance marketing, social media marketing, and more.</p>
          </div>
          <div className="story-image"></div>
        </div>

        {/* The Journey Section */}
        <div className="journey-section">
          <div className="journey-image">
            <div className="item">Image 1</div>
            <div className="item">Image 2</div>
            <div className="item">Image 3</div>
          </div>
          <div className="journey-content" ref={journeyRef}>
            <h3>The Journey</h3>
            <p>The path was far from smooth. Yet, the trio's determination kept them ahead of the curve. A significant milestone came when they participated in the Startup India Initiative, competing with over 300 startups from Maharashtra.
              Techinfinity quickly gained recognition, representing Maharashtra Small Scale Industries Development Corporation (MSSIDC) and securing a spot among the Top 60 Startups at the Magnetic Maharashtra Symposium. Their success was further cemented when they were featured in a coffee table book launched by Maharashtra's former Chief Minister, Devendra Fadnavis, in 2017.</p>
          </div>
        </div>

        {/* The Future Section */}
        <div className="future-section">
          <div className="future-content" ref={futureRef}>
            <h3>Today and Beyond</h3>
            <p>From chasing dreams to building a thriving brand, Techinfinity has come a long way. What began as a small startup with just six people in a 300 sq. ft. space has grown into a vibrant team of 42 working from a 1200 sq. ft. office.
              Today, Techinfinity proudly partners with leading names like the Indian Navy, KFC, Reliance, Orra Jewellery, and Yes Bank. With nine years of growth and learning, the team now aims for international expansion while continuing to deliver exceptional work and uphold the human values that have driven their journey from the start.</p>
          </div>
          <div className="future-image">
            <div className="future-item">Image 1</div>
            <div className="future-item">Image 2</div>
            <div className="future-item">Image 3</div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="achievements-container" ref={achievementsRef}>
          <div className="achievement1">
            <img src={icon} alt="icon" />
            <p>Entrepreneurs Under 30<br />
              (Awards & Recognition) 2022</p>
          </div>
          <div className="achievement2">
            <img src={icon} alt="icon" />
            <p>IITF Startup Selection<br />
              (Government Recognition) 2022</p>
          </div>
          <div className="achievement3">
            <img src={icon} alt="icon" />
            <p>CM Feature<br />
              (Government Recognition) 2022</p>
          </div>
          <div className="achievement4">
            <img src={icon} alt="icon" />
            <p>100% Satisfaction<br />
              (Client Success) 2022</p>
          </div>
          <div className="achievement5">
            <img src={icon} alt="icon" />
            <p>Indian Navy Partnership<br />
              (Brand Collaboration) 2022</p>
          </div>
        </div>

        {/* About the Team Section */}
        <div className="team-section" ref={teamRef}>
          <h2>About the <em>Team</em></h2>
          <p className="team-description">
            Lorem ipsum dolor sit amet consectetur. Sed ac interdum congue adipiscing hendrerit mauris ante. Ut mattis venenatis viverra bibendum facilisis amet ut. Mauris duis magna eget quis velicula fella ut dapibus. Sodales ex tristique ut amet suscipit condimentum quam at et pellentesque phasellus ornare mauris massa quis elit risid dignissim quis elementum.
          </p>

          <div className="team-grid">
            <div className="grid-item">Team Member 1</div>
            <div className="grid-item">Team Member 2</div>
            <div className="grid-item">Team Member 3</div>
            <div className="grid-item">Team Member 4</div>
            <div className="grid-item">Team Member 5</div>
          </div>
        </div>
      </div>

      <div className="dream-squad-section">
        <div className="dream-content" ref={dreamRef}>
          <h1>The Dream <em>Squad</em></h1>
          <p>At Techinfinity, our strength lies in our people. Every project we deliver is powered by a passionate,
            skilled, and tightly-knit team that brings creativity, strategy, and innovation to life. We believe in celebrating each department and every individual who makes us who we are.</p>
        </div>
        <div className="director-section" ref={directorRef}>
          <h3 className="director-head">Directors</h3>
          <div className="director-imgs">
            <div className="ronak">
              <img src={d1} alt='ronak' />
              <div className="director-designation">
                <p className='director-name'>Ronak Parikh</p>
                <p>Director</p>
              </div>
            </div>
            <div className="omkar">
              <img src={d1} alt='omkar' />
              <div className="director-designation">
                <p className='director-name'>Omkar Pai</p>
                <p>Director</p>
              </div>
            </div>
            <div className="hemant">
              <img src={d1} alt='hemant' />
              <div className="director-designation">
                <p className='director-name'>Hemant Shah</p>
                <p>Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dev Team */}
      <DeveloperCarousel />

      {/* SEO Team */}
      <SeoCarousel />

      {/* GD Team */}
      <GraphicCarousel />

      {/* CS Team */}
      <CsCarousel />

      <Contactform />
    </>
  );
};

export default About;