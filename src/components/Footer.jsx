// Footer.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/TechinfinityLogo.png";
import VariableProximity from './TechinfinityFooter';

const Footer = () => {
  const footerRef = useRef(null);
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section company-info">
            <div className="techlogo">
              <Link to="/">
                <img src={logo} alt="Techinfinity Logo" />
              </Link>
            </div>
            <div className="phone">
              <p>
                <strong>Tel :</strong>
                <a href="tel:98333 88717" className="phone-link">
                  +91 98333 88717
                </a>
              </p>
            </div>
          </div>

          <div className="footer-section address-section">
            <h3>Address</h3>
            <strong>Techinfinity HQ</strong>
            <p>2A Majestic mansion, 380,</p>
            <p>Sardar Vallabhbhai Patel Rd, Prathna Samaj,</p>
            <p>Mumbai, Maharashtra 400004</p>
            <p className="landmark">Landmark: Quality Wines</p>
          </div>

          <div className="footer-section support-section">
            <h3>Online Support</h3>
            <p>Interested in working with us?</p>
            <p>
              <a href="mailto:info@techinfinity.io" className="email-link">
                info@techinfinity.io
              </a>
            </p>
            <h3 style={{ marginTop: 30 }}>Careers</h3>
            <p>Looking for a job opportunity?</p>
            <p>
              <Link to="/careers" className="career-link">
                <p>See open positions</p>
              </Link>
            </p>
          </div>

          <div className="footer-section newsletter">
            <h3>Sign up for the newsletter</h3>
            <form className="newsletter-form">
              <input 
                type="email" 
                className="email-input" 
                placeholder="Email address" 
                required 
              />
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
            </form>
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                id="newsletter-consent" 
                className="checkbox" 
              />
              <label htmlFor="newsletter-consent" className="checkbox-label">
                I'm okay with getting emails and having that activity tracked to improve my experience.
              </label>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          All Rights Reserved 2025 © Techinfinity ™
        </div>

        {/* <div className="footer-large-text-desktop">TECHINFINITY</div>
        <div className="footer-large-text-mobile">TECHINFINITY</div> */}

        <div
          ref={footerRef}
          style={{ 
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '120px'
          }}
        >
          <VariableProximity
            label="TECHINFINITY"
            className="variable-proximity-demo"
            fromFontVariationSettings="'wght' 800, 'opsz' 9"
            toFontVariationSettings="'wght' 300, 'opsz' 40"
            containerRef={footerRef}
            radius={120}
            falloff="exponential"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;