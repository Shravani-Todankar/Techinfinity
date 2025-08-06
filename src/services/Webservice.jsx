import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import './Webservice.css';
import CTAform from "../works/form";

// TextScramble Component
const TextScramble = ({ phrases = ['Web Development'], interval = 1200 }) => {
    const [displayText, setDisplayText] = useState('');
    const [counter, setCounter] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const frameRef = useRef();
    const queueRef = useRef([]);
    const frameCountRef = useRef(0);
    const resolveRef = useRef();
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    const randomChar = useCallback(() => {
        return chars[Math.floor(Math.random() * chars.length)];
    }, [chars]);

    const formatText = useCallback((text) => {
        if (text === 'Web Development') {
            return '<span class="web-text">Web&nbsp;</span> <span class="dev-text-final"><em>Development</em></span>';
        }
        return text;
    }, []);

    const update = useCallback(() => {
        let output = '';
        let complete = 0;

        for (let i = 0; i < queueRef.current.length; i++) {
            let { from, to, start, end, char } = queueRef.current[i];

            if (frameCountRef.current >= end) {
                complete++;
                output += to;
            } else if (frameCountRef.current >= start) {
                if (!char || Math.random() < 0.28) {
                    char = randomChar();
                    queueRef.current[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        setDisplayText(output);

        if (complete === queueRef.current.length) {
            // Apply special formatting after scrambling is complete
            const currentPhrase = phrases[counter] || '';
            if (currentPhrase === 'Web Development') {
                setTimeout(() => {
                    setDisplayText(formatText(currentPhrase));
                }, 100);
            }
            
            if (resolveRef.current) {
                resolveRef.current();
            }
        } else {
            frameRef.current = requestAnimationFrame(update);
            frameCountRef.current++;
        }
    }, [randomChar, counter, phrases, formatText]);

    const setText = useCallback((newText, oldText = '') => {
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => {
            resolveRef.current = resolve;
        });

        queueRef.current = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            queueRef.current.push({ from, to, start, end });
        }

        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }

        frameCountRef.current = 0;
        update();

        return promise;
    }, [update]);

    const next = useCallback(() => {
        const currentText = phrases[counter] || '';
        const previousText = displayText.replace(/<[^>]*>/g, '') || ''; // Strip HTML tags

        setText(currentText, previousText).then(() => {
            // Check if we've reached the last phrase
            if (counter === phrases.length - 1) {
                setIsComplete(true);
                return;
            }

            setTimeout(() => {
                setCounter((prev) => prev + 1);
            }, interval);
        });
    }, [counter, phrases, setText, interval, displayText]);

    useEffect(() => {
        if (!isComplete) {
            next();
        }

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [counter]);

    return (
        <div className="webdev-text-scramble-container">
            <div
                className="webdev-text"
                dangerouslySetInnerHTML={{ __html: displayText }}
            />
        </div>
    );
};

// Carousel Component
const Carousel = () => {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isPinned, setIsPinned] = useState(false);

  const carouselRef = useRef(null);
  const cursor1Ref = useRef(null);
  const cursor2Ref = useRef(null);
  const navigate = useNavigate(); // Add this hook

  // Constants
  const speedWheel = 0.02;
  const speedDrag = -0.1;

  // Carousel items data - Updated with route information
  const items = [
    {
      title: "Lakme",
      num: "01",
      img: "https://media.istockphoto.com/id/949299844/it/foto/vista-prospettica-dellesterno-delledificio-contemporaneo.jpg?s=612x612&w=0&k=20&c=_DR1aRHuTEV3EYBJo1ZXq1pF4SgwB9EVWQLaBj4sC5g=",
      route: "/lakme" // Add route for Lakme
    },
    {
      title: "BespokeBliss",
      num: "02",
      img: "https://media.istockphoto.com/id/1150545984/it/foto/palazzo-moderno-di-lusso-con-piscina.jpg?s=612x612&w=0&k=20&c=Pbrai_VGc9tUviMCF1UaBErdS1YGyIVWsD29jzMZwTY=",
      route: null // No route yet
    },
    {
      title: "Derma MD",
      num: "03",
      img: "https://media.istockphoto.com/id/1214351345/it/foto/guardando-direttamente-lo-skyline-del-quartiere-finanziario-nel-centro-di-londra-immagine-di.jpg?s=612x612&w=0&k=20&c=oNNbPzPvcQ-4RA6AeatNIxHQIafBiXmDRtUUY0Ska-I=",
      route: null
    },
    {
      title: "Sarvatra",
      num: "04",
      img: "https://media.istockphoto.com/id/904390980/it/foto/foto-di-architettura-contemporanea-astratta.jpg?s=612x612&w=0&k=20&c=_P4Wmx5nq5MeDuimpNklKCBlrLovmCyd9lfiMKeJZDs=",
      route: null
    },
    {
      title: "MediSkin",
      num: "05",
      img: "https://media.istockphoto.com/id/130408311/it/foto/piscina-allesterno-della-casa-moderna-al-crepuscolo.jpg?s=612x612&w=0&k=20&c=ZoVjx7uDjoHKmpM1ayW6UR1SQOoYh_xx-QMG_qeOYs0=",
      route: null
    },
    {
      title: "Rapoo",
      num: "06",
      img: "https://media.istockphoto.com/id/1299954175/it/foto/villa-cubica-moderna.jpg?s=612x612&w=0&k=20&c=DhGhb3c1E3DW_fbrWJ_R_Zh0Lbwu6syFeRLsKlZ9no8=",
      route: null
    },
    {
      title: "Transil",
      num: "07",
      img: "https://media.istockphoto.com/id/926689776/it/foto/vista-ad-angolo-basso-dei-grattacieli-di-new-york.jpg?s=612x612&w=0&k=20&c=DmEB0Ty7ZwDnBoU5SuA8FNevOp4G1UcECw5aS4vA9A8=",
      route: null
    },
    {
      title: "Swaaha",
      num: "08",
      img: "https://media.istockphoto.com/id/1191376167/it/foto/villa-dellisola.jpg?s=612x612&w=0&k=20&c=PKslWo4FdbjinohKQlK_oWL34jqAsnzMTdy2bxEAf-I=",
      route: null
    },
    {
      title: "Happiclap",
      num: "09",
      img: "https://media.istockphoto.com/id/184316397/it/foto/londra-edifici-aziendali.jpg?s=612x612&w=0&k=20&c=XqrRxEPzFnwRFk7PQrCiu9-FPfCTPyMe5BKKaxYXCs8=",
      route: null
    },
    {
      title: "EatProt",
      num: "10",
      img: "https://media.istockphoto.com/id/184619832/it/foto/distretto-finanziario-al-crepuscolo-londra.jpg?s=612x612&w=0&k=20&c=RAThrJOBY6vhlT6-kQpu9-9jLEzWToYfdw46S8B0Mu0=",
      route: null
    }
  ];

  // Get Z-index for 3D effect
  const getZindex = (array, index) => {
    return array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));
  };

  // Update active item and progress
  useEffect(() => {
    const clampedProgress = Math.max(0, Math.min(progress, 100));
    const newActive = Math.floor(clampedProgress / 100 * (items.length - 1));
    setActive(newActive);
  }, [progress, items.length]);

  // Handle wheel events
  useEffect(() => {
    const handleWheel = (e) => {
      const wheelProgress = e.deltaY * speedWheel;
      setProgress(prev => prev + wheelProgress);
    };

    document.addEventListener('wheel', handleWheel);
    return () => document.removeEventListener('wheel', handleWheel);
  }, []);

  // Handle mouse/touch events
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update cursor position
      const x = e.clientX;
      const y = e.clientY;
      setCursorPosition({ x, y });

      if (!isDown) return;

      const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const mouseProgress = (currentX - startX) * speedDrag;
      setProgress(prev => prev + mouseProgress);
      setStartX(currentX);
    };

    const handleMouseDown = (e) => {
      setIsDown(true);
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      setStartX(x);
    };

    const handleMouseUp = () => {
      setIsDown(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleMouseDown);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleMouseDown);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDown, startX, speedDrag]);

  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;

      const rect = carouselRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom > windowHeight / 2) {
        setIsPinned(true);
      } else {
        setIsPinned(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update cursor position
  useEffect(() => {
    if (cursor1Ref.current) {
      cursor1Ref.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
    }
    if (cursor2Ref.current) {
      cursor2Ref.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
    }
  }, [cursorPosition]);

  // Handle item click - Updated to navigate to route if available
  const handleItemClick = (index) => {
    const item = items[index];
    
    // If the item has a route, navigate to it
    if (item.route) {
      navigate(item.route);
      return;
    }
    
    // Otherwise, just update the carousel position
    const newProgress = (index / items.length) * 100 + 10;
    setProgress(newProgress);
  };

  // Handle navigation buttons
  const handlePrevious = () => {
    const newActive = active > 0 ? active - 1 : items.length - 1;
    const newProgress = (newActive / items.length) * 100 + 10;
    setProgress(newProgress);
  };

  const handleNext = () => {
    const newActive = active < items.length - 1 ? active + 1 : 0;
    const newProgress = (newActive / items.length) * 100 + 10;
    setProgress(newProgress);
  };

  // Calculate item styles
  const getItemStyles = (index) => {
    const zIndexes = getZindex(items, active);
    const zIndex = zIndexes[index];
    const activeValue = (index - active) / items.length;
    const opacity = zIndex / items.length * 3 - 2;

    return {
      '--zIndex': zIndex,
      '--active': activeValue,
      '--opacity': opacity,
      '--items': items.length
    };
  };

  return (
    <div className="dev-projects-container">
      <div className="dev-projects-carousel" ref={carouselRef}>
        {items.map((item, index) => (
          <div
            key={index}
            className="dev-projects-item"
            style={{
              ...getItemStyles(index),
              cursor: item.route ? 'pointer' : 'default' // Change cursor for clickable items
            }}
            onClick={() => handleItemClick(index)}
          >
            <div className="dev-projects-box">
              <div className="dev-projects-title">{item.title}</div>
              <div className="dev-projects-num">{item.num}</div>
              <img src={item.img} alt={item.title} />
              {/* Add a subtle indicator for clickable items */}
              {item.route && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  color: 'white',
                  fontSize: '12px',
                  opacity: 0.7,
                  pointerEvents: 'none'
                }}>
                  ↗
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="dev-projects-nav">
        <button className="dev-projects-nav-btn dev-projects-nav-prev" onClick={handlePrevious}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="dev-projects-nav-btn dev-projects-nav-next" onClick={handleNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="dev-projects-layout">
        <div className="dev-projects-text-box">
          The world's leading brands<br />
          trust us to deliver<br />
          exceptional results
        </div>
      </div>

      <div className="dev-projects-cursor" ref={cursor1Ref}></div>
      <div className="dev-projects-cursor dev-projects-cursor2" ref={cursor2Ref}></div>
    </div>
  );
};

const WebDevelopmentSection = () => {
  const faqData = [
    {
      question: "What is included in your web development services?",
      answer:
        "We offer end-to-end web development including UI/UX design, front-end and back-end development, CMS integration, e-commerce solutions, mobile responsiveness, SEO optimization, and ongoing maintenance.",
    },
    {
      question: "How long does it take to build a website?",
      answer:
        "It typically takes between 4 to 8 weeks depending on the project scope and client feedback.",
    },
    {
      question: "Do you build mobile-responsive websites?",
      answer:
        "Yes, all our websites are designed to be fully responsive across all devices and screen sizes.",
    },
    {
      question: "Will my website be SEO-friendly?",
      answer:
        "Absolutely! We follow best SEO practices during development to ensure your site is optimized for search engines.",
    },
    {
      question: "Can you redesign my existing website?",
      answer:
        "Yes, we offer full website redesign services to modernize the look and improve performance and usability.",
    },
    {
      question: "Do you provide website maintenance after launch?",
      answer:
        "Yes, we provide ongoing support and maintenance plans to keep your website secure and up to date.",
    },
  ];

  const InfinityShape = () => {
    const containerRef = useRef(null);
    const totalImages = 28;
    const [dimensions, setDimensions] = useState({ centerX: 300, centerY: 300, radius: 170 });

    useEffect(() => {
      const updateLayout = () => {
        const isMobile = window.innerWidth <= 768;

        setDimensions({
          centerX: isMobile ? 180 : 300,
          centerY: isMobile ? 180 : 300,
          radius: isMobile ? 100 : 170,
        });
      };

      updateLayout();
      window.addEventListener("resize", updateLayout);
      return () => window.removeEventListener("resize", updateLayout);
    }, []);

    useEffect(() => {
      const elements = containerRef.current.querySelectorAll(".faq-img");
      const duration = 8000;
      let startTime = null;

      function animate(time) {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;

        elements.forEach((el, i) => {
          const t = ((elapsed + i * 300) / duration) * 2 * Math.PI * 1.35;
          const x = dimensions.centerX + dimensions.radius * Math.sin(t) * Math.cos(t);
          const y = dimensions.centerY + dimensions.radius * Math.sin(t);
          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
        });

        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }, [dimensions]);

    return (
      <div className="faq-img-container" ref={containerRef}>
        {Array.from({ length: totalImages }, (_, index) => (
          <img
            key={index}
            src={`https://picsum.photos/seed/${index + 1}/60/60`}
            alt={`random-${index}`}
            className="faq-img"
          />
        ))}
      </div>
    );
  };

  const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFAQ = (index) => {
      setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
      <div className="faq-container">
        <div className="faq-left">
          <h2 className="faq-heading">
            Frequently Asked <span className="italic">Questions</span>
          </h2>
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div className="faq-item" key={index}>
                <div className="faq-question" onClick={() => toggleFAQ(index)}>
                  <span>{item.question}</span>
                  <span>{openIndex === index ? '−' : '+'}</span>
                </div>
                {openIndex === index && (
                  <div className="faq-answer">{item.answer}</div>
                )}
                <hr />
              </div>
            ))}
          </div>
        </div>

        <div className="faq-right">
          <InfinityShape />
        </div>
      </div>
    );
  };

  return (
    <section className="webdev-section">
      <div className="webdev-header">
        {/* Replace static heading with TextScramble animation */}
        <TextScramble phrases={['Web Development']} interval={1200} />
      </div>
      <div className="webdev-content">
        <div className="webdev-benefits">
          <h4>Benefits</h4>
          <p>
            We create visually stunning websites designed for <strong>seamless</strong>, lasting experiences that
            <strong> engage, retain</strong>, and <strong>deliver results</strong>.
          </p>
          {/* <button className="get-in-touch">Get In Touch</button> */}
          <button className="get-in-touch">
            Get In Touch
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`star-${i + 1}`}>
                <svg viewBox="0 0 784.11 815.53">
                  <path
                    className="get-in-touch-fil0"
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  />
                </svg>
              </div>
            ))}
          </button>
        </div>
        <div className="webdev-services">
          <h4>Services</h4>
          <ul>
            <li className='firstlist'><span>01</span> Custom Website Development</li>
            <li><span>02</span> E-Commerce Development</li>
            <li><span>03</span> CMS Integration</li>
            <li><span>04</span> Front-End Development</li>
            <li><span>05</span> Website Maintenance & Support</li>
            <li><span>06</span> Web Performance Optimization</li>
          </ul>
        </div>
      </div>

      {/* Carousel Section - Add this wherever you want it to appear */}
      <Carousel />

      {/* Mounting the FAQ Section */}
      <FaqSection />

      <CTAform />
    </section>
  );
};

export default WebDevelopmentSection;