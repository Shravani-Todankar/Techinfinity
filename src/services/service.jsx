import React, { useEffect, useRef, useState } from 'react';
import './service.css';
import CTAform from "../works/form";

// Carousel Component
const Carousel = () => {
  const [progress, setProgress] = useState(50);
  const [active, setActive] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  const carouselRef = useRef(null);
  const cursor1Ref = useRef(null);
  const cursor2Ref = useRef(null);

  // Constants
  const speedWheel = 0.02;
  const speedDrag = -0.1;

  // Carousel items data
  const items = [
    {
      title: "Rapoo",
      num: "01",
      img: "https://media.istockphoto.com/id/949299844/it/foto/vista-prospettica-dellesterno-delledificio-contemporaneo.jpg?s=612x612&w=0&k=20&c=_DR1aRHuTEV3EYBJo1ZXq1pF4SgwB9EVWQLaBj4sC5g="
    },
    {
      title: "BespokeBliss",
      num: "02",
      img: "https://media.istockphoto.com/id/1150545984/it/foto/palazzo-moderno-di-lusso-con-piscina.jpg?s=612x612&w=0&k=20&c=Pbrai_VGc9tUviMCF1UaBErdS1YGyIVWsD29jzMZwTY="
    },
    {
      title: "Derma MD",
      num: "03",
      img: "https://media.istockphoto.com/id/1214351345/it/foto/guardando-direttamente-lo-skyline-del-quartiere-finanziario-nel-centro-di-londra-immagine-di.jpg?s=612x612&w=0&k=20&c=oNNbPzPvcQ-4RA6AeatNIxHQIafBiXmDRtUUY0Ska-I="
    },
    {
      title: "Sarvatra",
      num: "04",
      img: "https://media.istockphoto.com/id/904390980/it/foto/foto-di-architettura-contemporanea-astratta.jpg?s=612x612&w=0&k=20&c=_P4Wmx5nq5MeDuimpNklKCBlrLovmCyd9lfiMKeJZDs="
    },
    {
      title: "MediSkin",
      num: "05",
      img: "https://media.istockphoto.com/id/130408311/it/foto/piscina-allesterno-della-casa-moderna-al-crepuscolo.jpg?s=612x612&w=0&k=20&c=ZoVjx7uDjoHKmpM1ayW6UR1SQOoYh_xx-QMG_qeOYs0="
    },
    {
      title: "Kunuts",
      num: "06",
      img: "https://media.istockphoto.com/id/1299954175/it/foto/villa-cubica-moderna.jpg?s=612x612&w=0&k=20&c=DhGhb3c1E3DW_fbrWJ_R_Zh0Lbwu6syFeRLsKlZ9no8="
    },
    {
      title: "Transil",
      num: "07",
      img: "https://media.istockphoto.com/id/926689776/it/foto/vista-ad-angolo-basso-dei-grattacieli-di-new-york.jpg?s=612x612&w=0&k=20&c=DmEB0Ty7ZwDnBoU5SuA8FNevOp4G1UcECw5aS4vA9A8="
    },
    {
      title: "Swaaha",
      num: "08",
      img: "https://media.istockphoto.com/id/1191376167/it/foto/villa-dellisola.jpg?s=612x612&w=0&k=20&c=PKslWo4FdbjinohKQlK_oWL34jqAsnzMTdy2bxEAf-I="
    },
    {
      title: "Happiclap",
      num: "09",
      img: "https://media.istockphoto.com/id/184316397/it/foto/londra-edifici-aziendali.jpg?s=612x612&w=0&k=20&c=XqrRxEPzFnwRFk7PQrCiu9-FPfCTPyMe5BKKaxYXCs8="
    },
    {
      title: "EatProt",
      num: "10",
      img: "https://media.istockphoto.com/id/184619832/it/foto/distretto-finanziario-al-crepuscolo-londra.jpg?s=612x612&w=0&k=20&c=RAThrJOBY6vhlT6-kQpu9-9jLEzWToYfdw46S8B0Mu0="
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

  // Update cursor position
  useEffect(() => {
    if (cursor1Ref.current) {
      cursor1Ref.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
    }
    if (cursor2Ref.current) {
      cursor2Ref.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
    }
  }, [cursorPosition]);

  // Handle item click
  const handleItemClick = (index) => {
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
            style={getItemStyles(index)}
            onClick={() => handleItemClick(index)}
          >
            <div className="dev-projects-box">
              <div className="dev-projects-title">{item.title}</div>
              <div className="dev-projects-num">{item.num}</div>
              <img src={item.img} alt={item.title} />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="dev-projects-nav">
        <button className="dev-projects-nav-btn dev-projects-nav-prev" onClick={handlePrevious}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="dev-projects-nav-btn dev-projects-nav-next" onClick={handleNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                <h1>
                    Web <em>Development</em>
                </h1>
            </div>
            <div className="webdev-content">
                <div className="webdev-benefits">
                    <h4>Benefits</h4>
                    <p>
                        We create visually stunning websites designed for <strong>seamless</strong>, lasting experiences that
                        <strong> engage, retain</strong>, and <strong>deliver results</strong>.
                    </p>
                    <button className="get-in-touch">Get In Touch</button>
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

            {/* Carousel Section */}
            <Carousel />

            {/* Mounting the FAQ Section */}
            <FaqSection />

            <CTAform />
        </section>
    );
};

export default WebDevelopmentSection;
