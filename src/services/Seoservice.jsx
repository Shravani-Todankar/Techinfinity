import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Seoservice.css';
import CTAform from "../works/form";

// Dynamic image imports - Add this function to dynamically import images
const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

// Import all images from assets/infinity2 folder
const getInfinityImages = () => {
  try {
    // This will import all images from the infinity2 folder
    const images = importAll(
      require.context('../assets/infinity2', false, /\.(png|jpe?g|svg)$/)
    );
    
    // Convert to array and sort by filename, then limit to 20 images
    return Object.entries(images)
      .sort(([a], [b]) => {
        // Extract numbers from filenames for proper sorting
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      })
      .map(([key, value]) => value.default || value)
      .slice(0, 20); // Limit to only 20 images
  } catch (error) {
    console.warn('Could not load infinity images:', error);
    // Fallback to manual imports if dynamic import fails
    return [];
  }
};

// TextScramble Component for SEO
const SEOTextScramble = ({ phrases = ['Search Engine Optimization'], interval = 1200 }) => {
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
        if (text === 'Search Engine Optimization') {
            return '<span class="search-engine-text">Search Engine&nbsp;</span> <span class="optimization-text-final"><em>Optimization</em></span>';
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
            if (currentPhrase === 'Search Engine Optimization') {
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
        <div className="seo-text-scramble-container">
            <div
                className="seo-text"
                dangerouslySetInnerHTML={{ __html: displayText }}
            />
        </div>
    );
};

// SEO Portfolio Carousel Component
const SEOPortfolioCarousel = () => {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isPinned, setIsPinned] = useState(false);

  const carouselRef = useRef(null);
  const cursor1Ref = useRef(null);
  const cursor2Ref = useRef(null);

  // Constants
  const speedWheel = 0.02;
  const speedDrag = -0.1;

  // SEO Portfolio items data
  const seoProjects = [
    {
      title: "E-commerce SEO",
      num: "01",
      img: "https://media.istockphoto.com/id/949299844/it/foto/vista-prospettica-dellesterno-delledificio-contemporaneo.jpg?s=612x612&w=0&k=20&c=_DR1aRHuTEV3EYBJo1ZXq1pF4SgwB9EVWQLaBj4sC5g="
    },
    {
      title: "Local SEO",
      num: "02",
      img: "https://media.istockphoto.com/id/1150545984/it/foto/palazzo-moderno-di-lusso-con-piscina.jpg?s=612x612&w=0&k=20&c=Pbrai_VGc9tUviMCF1UaBErdS1YGyIVWsD29jzMZwTY="
    },
    {
      title: "Technical SEO",
      num: "03",
      img: "https://media.istockphoto.com/id/1214351345/it/foto/guardando-direttamente-lo-skyline-del-quartiere-finanziario-nel-centro-di-londra-immagine-di.jpg?s=612x612&w=0&k=20&c=oNNbPzPvcQ-4RA6AeatNIxHQIafBiXmDRtUUY0Ska-I="
    },
    {
      title: "Content Optimization",
      num: "04",
      img: "https://media.istockphoto.com/id/904390980/it/foto/foto-di-architettura-contemporanea-astratta.jpg?s=612x612&w=0&k=20&c=_P4Wmx5nq5MeDuimpNklKCBlrLovmCyd9lfiMKeJZDs="
    },
    {
      title: "SERP Analysis",
      num: "05",
      img: "https://media.istockphoto.com/id/130408311/it/foto/piscina-allesterno-della-casa-moderna-al-crepuscolo.jpg?s=612x612&w=0&k=20&c=ZoVjx7uDjoHKmpM1ayW6UR1SQOoYh_xx-QMG_qeOYs0="
    },
    {
      title: "Keyword Research",
      num: "06",
      img: "https://media.istockphoto.com/id/1299954175/it/foto/villa-cubica-moderna.jpg?s=612x612&w=0&k=20&c=DhGhb3c1E3DW_fbrWJ_R_Zh0Lbwu6syFeRLsKlZ9no8="
    },
    {
      title: "Link Building",
      num: "07",
      img: "https://media.istockphoto.com/id/926689776/it/foto/vista-ad-angolo-basso-dei-grattacieli-di-new-york.jpg?s=612x612&w=0&k=20&c=DmEB0Ty7ZwDnBoU5SuA8FNevOp4G1UcECw5aS4vA9A8="
    },
    {
      title: "Mobile SEO",
      num: "08",
      img: "https://media.istockphoto.com/id/1191376167/it/foto/villa-dellisola.jpg?s=612x612&w=0&k=20&c=PKslWo4FdbjinohKQlK_oWL34jqAsnzMTdy2bxEAf-I="
    },
    {
      title: "Page Speed Optimization",
      num: "09",
      img: "https://media.istockphoto.com/id/184316397/it/foto/londra-edifici-aziendali.jpg?s=612x612&w=0&k=20&c=XqrRxEPzFnwRFk7PQrCiu9-FPfCTPyMe5BKKaxYXCs8="
    },
    {
      title: "Schema Markup",
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
    const newActive = Math.floor(clampedProgress / 100 * (seoProjects.length - 1));
    setActive(newActive);
  }, [progress, seoProjects.length]);

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

  // Handle item click
  const handleItemClick = (index) => {
    const newProgress = (index / seoProjects.length) * 100 + 10;
    setProgress(newProgress);
  };

  // Handle navigation buttons
  const handlePrevious = () => {
    const newActive = active > 0 ? active - 1 : seoProjects.length - 1;
    const newProgress = (newActive / seoProjects.length) * 100 + 10;
    setProgress(newProgress);
  };

  const handleNext = () => {
    const newActive = active < seoProjects.length - 1 ? active + 1 : 0;
    const newProgress = (newActive / seoProjects.length) * 100 + 10;
    setProgress(newProgress);
  };

  // Calculate item styles
  const getItemStyles = (index) => {
    const zIndexes = getZindex(seoProjects, active);
    const zIndex = zIndexes[index];
    const activeValue = (index - active) / seoProjects.length;
    const opacity = zIndex / seoProjects.length * 3 - 2;

    return {
      '--zIndex': zIndex,
      '--active': activeValue,
      '--opacity': opacity,
      '--items': seoProjects.length
    };
  };

  return (
    <div className="seo-portfolio-container">
      <div className="seo-portfolio-carousel" ref={carouselRef}>
        {seoProjects.map((item, index) => (
          <div
            key={index}
            className="seo-portfolio-item"
            style={getItemStyles(index)}
            onClick={() => handleItemClick(index)}
          >
            <div className="seo-portfolio-box">
              <div className="seo-portfolio-title">{item.title}</div>
              <div className="seo-portfolio-num">{item.num}</div>
              <img src={item.img} alt={item.title} />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="seo-portfolio-nav">
        <button className="seo-portfolio-nav-btn seo-portfolio-nav-prev" onClick={handlePrevious}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="seo-portfolio-nav-btn seo-portfolio-nav-next" onClick={handleNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="seo-portfolio-layout">
        <div className="seo-portfolio-text-box">
          Top search engine rankings<br />
          through data-driven<br />
          SEO strategies
        </div>
      </div>

      <div className="seo-portfolio-cursor" ref={cursor1Ref}></div>
      <div className="seo-portfolio-cursor seo-portfolio-cursor2" ref={cursor2Ref}></div>
    </div>
  );
};

const SEOServicesSection = () => {
  const seoFaqData = [
    {
      question: "What is included in your SEO services?",
      answer:
        "We offer comprehensive SEO including keyword research, on-page optimization, technical SEO, content strategy, link building, local SEO, and detailed analytics reporting.",
    },
    {
      question: "How long does it take to see SEO results?",
      answer:
        "SEO is a long-term strategy. You may see initial improvements in 3-6 months, with significant results typically visible after 6-12 months of consistent optimization.",
    },
    {
      question: "Do you guarantee first page rankings?",
      answer:
        "While we cannot guarantee specific rankings due to search engine algorithm changes, we focus on sustainable, white-hat techniques that improve your overall search visibility.",
    },
    {
      question: "How do you measure SEO success?",
      answer:
        "We track organic traffic growth, keyword rankings, click-through rates, conversion rates, and overall ROI to measure the effectiveness of our SEO campaigns.",
    },
    {
      question: "Do you work with local businesses?",
      answer:
        "Yes, we specialize in local SEO to help businesses improve their visibility in local search results and Google My Business optimization.",
    },
    {
      question: "What's the difference between SEO and paid advertising?",
      answer:
        "SEO focuses on organic search results through optimization, while paid advertising provides immediate visibility through paid placements. SEO provides long-term sustainable results.",
    },
  ];

  const SEORankingAnimation = () => {
    const containerRef = useRef(null);
    const [infinityImages, setInfinityImages] = useState([]);
    const [dimensions, setDimensions] = useState({ centerX: 300, centerY: 300, radius: 170 });

    // Load images on component mount
    useEffect(() => {
      const loadImages = () => {
        try {
          const images = getInfinityImages();
          if (images.length > 0) {
            setInfinityImages(images);
          } else {
            console.warn('No images found in assets/infinity2 folder, using fallback');
            setInfinityImages([]);
          }
        } catch (error) {
          console.error('Error loading infinity images:', error);
          setInfinityImages([]);
        }
      };

      loadImages();
    }, []);

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
      if (!containerRef.current || infinityImages.length === 0) return;

      const elements = containerRef.current.querySelectorAll(".seo-faq-img");
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
    }, [dimensions, infinityImages]);

    // Don't render if no images are loaded
    if (infinityImages.length === 0) {
      return (
        <div className="seo-faq-img-container">
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            color: '#666',
            fontSize: '14px'
          }}>
            Loading images...
          </div>
        </div>
      );
    }

    return (
      <div className="seo-faq-img-container" ref={containerRef}>
        {infinityImages.map((imageSrc, index) => (
          <img
            key={index}
            src={imageSrc}
            alt={`seo-ranking-${index + 1}`}
            className="seo-faq-img"
            onError={(e) => {
              console.warn(`Failed to load image at index ${index}:`, imageSrc);
              e.target.style.display = 'none'; // Hide broken images
            }}
          />
        ))}
      </div>
    );
  };

  const SEOFaqSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFAQ = (index) => {
      setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
      <div className="seo-faq-container">
        <div className="seo-faq-left">
          <h2 className="seo-faq-heading">
            Frequently Asked <span className="italic">Questions</span>
          </h2>
          <div className="seo-faq-list">
            {seoFaqData.map((item, index) => (
              <div className="seo-faq-item" key={index}>
                <div className="seo-faq-question" onClick={() => toggleFAQ(index)}>
                  <span>{item.question}</span>
                  <span>{openIndex === index ? '−' : '+'}</span>
                </div>
                {openIndex === index && (
                  <div className="seo-faq-answer">{item.answer}</div>
                )}
                <hr />
              </div>
            ))}
          </div>
        </div>

        <div className="seo-faq-right">
          <SEORankingAnimation />
        </div>
      </div>
    );
  };

  return (
    <section className="seo-services-section">
      <div className="seo-services-header">
        {/* Replace static heading with TextScramble animation */}
        <SEOTextScramble phrases={['Search Engine Optimization']} interval={1200} />
      </div>
      <div className="seo-services-content">
        <div className="seo-benefits">
          <h4>Benefits</h4>
          <p>
            We deliver <strong>data-driven</strong> SEO strategies that boost your search rankings, increase
            <strong> organic traffic</strong>, and <strong>maximize ROI</strong> through sustainable optimization.
          </p>
          <button className="get-consultation">
            Get Consultation
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`ranking-star-${i + 1}`}>
                <svg viewBox="0 0 784.11 815.53">
                  <path
                    className="get-consultation-fil0"
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  />
                </svg>
              </div>
            ))}
          </button>
        </div>
        <div className="seo-offerings">
          <h4>Services</h4>
          <ul>
            <li className='first-seo-service'><span>01</span> Keyword Research & Strategy</li>
            <li><span>02</span> On-Page SEO Optimization</li>
            <li><span>03</span> Technical SEO Audits</li>
            <li><span>04</span> Content Optimization</li>
            <li><span>05</span> Link Building & Outreach</li>
            <li><span>06</span> Local SEO & GMB Optimization</li>
          </ul>
        </div>
      </div>

      {/* SEO Portfolio Carousel Section */}
      <SEOPortfolioCarousel />

      {/* SEO FAQ Section */}
      <SEOFaqSection />

      <CTAform />
    </section>
  );
};

export default SEOServicesSection;