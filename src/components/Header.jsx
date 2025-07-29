import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/TechinfinityLogo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
        <Link to="/service" onClick={closeMobileMenu}>Service</Link>
        <Link to="/our-works" onClick={closeMobileMenu}>Our Works</Link>
        <Link to="/about-us" onClick={closeMobileMenu}>About Us</Link>
      </nav>

      <button className="header-button desktop-only">
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
      </button>

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