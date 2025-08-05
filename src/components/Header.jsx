import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/TechinfinityLogo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServiceDropdownOpen(false);
  };

  const toggleServiceDropdown = (e) => {
    e.preventDefault();
    setIsServiceDropdownOpen(!isServiceDropdownOpen);
  };

  const handleMouseEnter = () => {
    setIsServiceDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsServiceDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" onClick={closeMobileMenu}>
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <nav className={`nav-links ${isMobileMenuOpen ? 'nav-open' : ''}`}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        
        {/* Service Dropdown */}
        <div 
          className="service-dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button 
            className="service-toggle"
            onClick={toggleServiceDropdown}
            aria-expanded={isServiceDropdownOpen}
          >
            Services
            <span className={`dropdown-arrow ${isServiceDropdownOpen ? 'open' : ''}`}>▼</span>
          </button>
          
          <div className={`dropdown-menu ${isServiceDropdownOpen ? 'show' : ''}`}>
            <Link to="/web-development" onClick={closeMobileMenu}>Web Development</Link>
            <Link to="/seo" onClick={closeMobileMenu}>SEO</Link>
            <Link to="/performance-marketing" onClick={closeMobileMenu}>Performance Marketing</Link>
            <Link to="/social-media" onClick={closeMobileMenu}>Social Media</Link>
            <a href="https://techinfinity.studio" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
              3D & 2D Animation
            </a>
            <Link to="/real-estate" onClick={closeMobileMenu}>Real Estate</Link>
            <a href="https://bespokebliss.in" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
              Gifting
            </a>
          </div>
        </div>

        <Link to="/our-work" onClick={closeMobileMenu}>Our Work</Link>
        <Link to="/about-us" onClick={closeMobileMenu}>About Us</Link>
        <Link to="/careers" onClick={closeMobileMenu}>Careers</Link>
        
        {/* Mobile Get In Touch Button */}
        <Link to="/contact-us" className="mobile-get-in-touch-btn mobile-only" onClick={closeMobileMenu}>
          Get In Touch
        </Link>
      </nav>

      {/* Desktop Get In Touch button */}
      <Link to="/contact-us" className="header-button desktop-only">
        Get In Touch
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`star-${i + 1}`}>
            <svg viewBox="0 0 784.11 815.53">
              <path
                className="fil0"
                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
              />
            </svg>
          </div>
        ))}
      </Link>

      {/* Mobile Menu Toggle */}
      <button 
        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}
    </header>
  );
};

export default Header;