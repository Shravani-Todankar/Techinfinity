import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/TechinfinityLogo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isMobileServiceOpen, setIsMobileServiceOpen] = useState(false);
  
  const headerRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileServiceOpen(false); // Close service dropdown when main menu toggles
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServiceDropdownOpen(false);
    setIsMobileServiceOpen(false);
  };

  const toggleServiceDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.innerWidth <= 768) {
      setIsMobileServiceOpen(!isMobileServiceOpen);
    } else {
      setIsServiceDropdownOpen(!isServiceDropdownOpen);
    }
  };

  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      // Clear any existing timeout
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      setIsServiceDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      // Add a small delay before closing to prevent flickering
      dropdownTimeoutRef.current = setTimeout(() => {
        setIsServiceDropdownOpen(false);
      }, 150);
    }
  };

  // Handle dropdown interaction to prevent closing when hovering over dropdown
  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (window.innerWidth > 768) {
      dropdownTimeoutRef.current = setTimeout(() => {
        setIsServiceDropdownOpen(false);
      }, 150);
    }
  };

  // Service data for the dropdown cards
  const services = [
    {
      title: "Web Development",
      link: "/web-development",
      icon: "💻"
    },
    {
      title: "SEO Services",
      link: "/seo",
      icon: "🔍"
    },
    {
      title: "Performance Marketing",
      link: "/performance-marketing",
      icon: "📊"
    },
    {
      title: "Social Media",
      link: "/social-media",
      icon: "📱"
    },
    {
      title: "3D & 2D Animation",
      link: "https://techinfinity.studio",
      external: true,
      icon: "🎬"
    },
    {
      title: "Real Estate",
      link: "https://techinfinity.studio/real-estate/",
      external: true,
      icon: "🏢"
    },
    {
      title: "Gifting",
      link: "https://bespokebliss.in",
      external: true,
      icon: "🎁"
    }
  ];

  return (
    <>
      <header className="header" ref={headerRef}>
        <div className="logo">
          <Link to="/" onClick={closeMobileMenu}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <nav className={`nav-links ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
          <Link to="/about-us" onClick={closeMobileMenu}>About Us</Link>

          {/* Service Dropdown */}
          <div
            className="service-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="service-toggle"
              onClick={toggleServiceDropdown}
              aria-expanded={isServiceDropdownOpen || isMobileServiceOpen}
              type="button"
            >
              Services
              <span className={`dropdown-arrow ${isServiceDropdownOpen || isMobileServiceOpen ? 'open' : ''}`}>▼</span>
            </button>

            {/* Desktop Dropdown Menu */}
            <div 
              className={`dropdown-menu-dapper desktop-dropdown ${isServiceDropdownOpen ? 'show' : ''}`}
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <div className="dropdown-container-dapper">
                <div className="dropdown-grid-dapper">
                  {services.map((service, index) => (
                    <div key={index} className="service-card-dapper">
                      {service.external ? (
                        <a
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            closeMobileMenu();
                          }}
                          className="service-card-link-dapper"
                        >
                          <div className="service-icon-dapper">{service.icon}</div>
                          <div className="service-content-dapper">
                            <h3 className="service-title-dapper">{service.title}</h3>
                          </div>
                          <div className="service-arrow-dapper">↗</div>
                        </a>
                      ) : (
                        <Link
                          to={service.link}
                          onClick={(e) => {
                            e.stopPropagation();
                            closeMobileMenu();
                          }}
                          className="service-card-link-dapper"
                        >
                          <div className="service-icon-dapper">{service.icon}</div>
                          <div className="service-content-dapper">
                            <h3 className="service-title-dapper">{service.title}</h3>
                          </div>
                          <div className="service-arrow-dapper">↗</div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`mobile-service-dropdown ${isMobileServiceOpen ? 'show' : ''}`}>
              {services.map((service, index) => (
                <div key={index} className="mobile-service-item">
                  {service.external ? (
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="mobile-service-link"
                    >
                      <span className="mobile-service-icon">{service.icon}</span>
                      <span className="mobile-service-title">{service.title}</span>
                      <span className="mobile-service-arrow">↗</span>
                    </a>
                  ) : (
                    <Link
                      to={service.link}
                      onClick={closeMobileMenu}
                      className="mobile-service-link"
                    >
                      <span className="mobile-service-icon">{service.icon}</span>
                      <span className="mobile-service-title">{service.title}</span>
                      <span className="mobile-service-arrow">→</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Link to="/our-work" onClick={closeMobileMenu}>Our Work</Link>
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
          type="button"
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

      {/* Desktop Backdrop Blur Overlay */}
      {isServiceDropdownOpen && (
        <div 
          className="dropdown-backdrop"
          onClick={() => setIsServiceDropdownOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;