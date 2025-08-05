import React, { useEffect, useRef, useState } from 'react';
import './PMservice.css';
import CTAform from "../works/form";

// Marketing Campaigns Carousel Component
const MarketingCampaignsCarousel = () => {
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

    // Marketing Campaign items data
    const marketingCampaigns = [
        {
            title: "Social Media Marketing",
            num: "01",
            img: "https://media.istockphoto.com/id/949299844/it/foto/vista-prospettica-dellesterno-delledificio-contemporaneo.jpg?s=612x612&w=0&k=20&c=_DR1aRHuTEV3EYBJo1ZXq1pF4SgwB9EVWQLaBj4sC5g="
        },
        {
            title: "Email Marketing",
            num: "02",
            img: "https://media.istockphoto.com/id/1150545984/it/foto/palazzo-moderno-di-lusso-con-piscina.jpg?s=612x612&w=0&k=20&c=Pbrai_VGc9tUviMCF1UaBErdS1YGyIVWsD29jzMZwTY="
        },
        {
            title: "Content Marketing",
            num: "03",
            img: "https://media.istockphoto.com/id/1214351345/it/foto/guardando-direttamente-lo-skyline-del-quartiere-finanziario-nel-centro-di-londra-immagine-di.jpg?s=612x612&w=0&k=20&c=oNNbPzPvcQ-4RA6AeatNIxHQIafBiXmDRtUUY0Ska-I="
        },
        {
            title: "PPC Advertising",
            num: "04",
            img: "https://media.istockphoto.com/id/904390980/it/foto/foto-di-architettura-contemporanea-astratta.jpg?s=612x612&w=0&k=20&c=_P4Wmx5nq5MeDuimpNklKCBlrLovmCyd9lfiMKeJZDs="
        },
        {
            title: "Brand Strategy",
            num: "05",
            img: "https://media.istockphoto.com/id/130408311/it/foto/piscina-allesterno-della-casa-moderna-al-crepuscolo.jpg?s=612x612&w=0&k=20&c=ZoVjx7uDjoHKmpM1ayW6UR1SQOoYh_xx-QMG_qeOYs0="
        },
        {
            title: "Influencer Marketing",
            num: "06",
            img: "https://media.istockphoto.com/id/1299954175/it/foto/villa-cubica-moderna.jpg?s=612x612&w=0&k=20&c=DhGhb3c1E3DW_fbrWJ_R_Zh0Lbwu6syFeRLsKlZ9no8="
        },
        {
            title: "Video Marketing",
            num: "07",
            img: "https://media.istockphoto.com/id/926689776/it/foto/vista-ad-angolo-basso-dei-grattacieli-di-new-york.jpg?s=612x612&w=0&k=20&c=DmEB0Ty7ZwDnBoU5SuA8FNevOp4G1UcECw5aS4vA9A8="
        },
        {
            title: "Marketing Automation",
            num: "08",
            img: "https://media.istockphoto.com/id/1191376167/it/foto/villa-dellisola.jpg?s=612x612&w=0&k=20&c=PKslWo4FdbjinohKQlK_oWL34jqAsnzMTdy2bxEAf-I="
        },
        {
            title: "Conversion Optimization",
            num: "09",
            img: "https://media.istockphoto.com/id/184316397/it/foto/londra-edifici-aziendali.jpg?s=612x612&w=0&k=20&c=XqrRxEPzFnwRFk7PQrCiu9-FPfCTPyMe5BKKaxYXCs8="
        },
        {
            title: "Growth Hacking",
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
        const newActive = Math.floor(clampedProgress / 100 * (marketingCampaigns.length - 1));
        setActive(newActive);
    }, [progress, marketingCampaigns.length]);

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
        const newProgress = (index / marketingCampaigns.length) * 100 + 10;
        setProgress(newProgress);
    };

    // Handle navigation buttons
    const handlePrevious = () => {
        const newActive = active > 0 ? active - 1 : marketingCampaigns.length - 1;
        const newProgress = (newActive / marketingCampaigns.length) * 100 + 10;
        setProgress(newProgress);
    };

    const handleNext = () => {
        const newActive = active < marketingCampaigns.length - 1 ? active + 1 : 0;
        const newProgress = (newActive / marketingCampaigns.length) * 100 + 10;
        setProgress(newProgress);
    };

    // Calculate item styles
    const getItemStyles = (index) => {
        const zIndexes = getZindex(marketingCampaigns, active);
        const zIndex = zIndexes[index];
        const activeValue = (index - active) / marketingCampaigns.length;
        const opacity = zIndex / marketingCampaigns.length * 3 - 2;

        return {
            '--zIndex': zIndex,
            '--active': activeValue,
            '--opacity': opacity,
            '--items': marketingCampaigns.length
        };
    };

    return (
        <div className="marketing-campaigns-container">
            <div className="marketing-campaigns-carousel" ref={carouselRef}>
                {marketingCampaigns.map((item, index) => (
                    <div
                        key={index}
                        className="marketing-campaigns-item"
                        style={getItemStyles(index)}
                        onClick={() => handleItemClick(index)}
                    >
                        <div className="marketing-campaigns-box">
                            <div className="marketing-campaigns-title">{item.title}</div>
                            <div className="marketing-campaigns-num">{item.num}</div>
                            <img src={item.img} alt={item.title} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="marketing-campaigns-nav">
                <button className="marketing-campaigns-nav-btn marketing-campaigns-nav-prev" onClick={handlePrevious}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button className="marketing-campaigns-nav-btn marketing-campaigns-nav-next" onClick={handleNext}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className="marketing-campaigns-layout">
                <div className="marketing-campaigns-text-box">
                    Data-driven marketing campaigns<br />
                    that drive growth and<br />
                    maximize ROI
                </div>
            </div>

            <div className="marketing-campaigns-cursor" ref={cursor1Ref}></div>
            <div className="marketing-campaigns-cursor marketing-campaigns-cursor2" ref={cursor2Ref}></div>
        </div>
    );
};

const MarketingServicesSection = () => {
    const marketingFaqData = [
        {
            question: "What marketing services do you offer?",
            answer:
                "We provide comprehensive digital marketing including social media marketing, email campaigns, content strategy, PPC advertising, SEO, influencer partnerships, and marketing automation.",
        },
        {
            question: "How do you measure marketing campaign success?",
            answer:
                "We track key metrics like ROI, conversion rates, cost per acquisition (CPA), engagement rates, click-through rates, and overall revenue growth to measure campaign effectiveness.",
        },
        {
            question: "Can you work with our existing marketing team?",
            answer:
                "Absolutely! We can collaborate with your internal team, provide training, or work as an extension of your marketing department to achieve your goals.",
        },
        {
            question: "What's your approach to target audience identification?",
            answer:
                "We use data analytics, market research, customer surveys, and behavioral analysis to create detailed buyer personas and identify your ideal target audience.",
        },
        {
            question: "Do you create marketing content in-house?",
            answer:
                "Yes, we have a creative team that produces high-quality content including graphics, videos, copywriting, and campaign materials tailored to your brand voice.",
        },
        {
            question: "How long does it take to see marketing results?",
            answer:
                "Results vary by channel and strategy. Social media and PPC can show immediate results, while content marketing and SEO typically show significant results in 3-6 months.",
        },
    ];

    const MarketingGrowthAnimation = () => {
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
            const elements = containerRef.current.querySelectorAll(".marketing-faq-img");
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
            <div className="marketing-faq-img-container" ref={containerRef}>
                {Array.from({ length: totalImages }, (_, index) => (
                    <img
                        key={index}
                        src={`https://picsum.photos/seed/${index + 1}/60/60`}
                        alt={`marketing-growth-${index}`}
                        className="marketing-faq-img"
                    />
                ))}
            </div>
        );
    };

    const MarketingFaqSection = () => {
        const [openIndex, setOpenIndex] = useState(0);

        const toggleFAQ = (index) => {
            setOpenIndex((prev) => (prev === index ? null : index));
        };

        return (
            <div className="marketing-faq-container">
                <div className="marketing-faq-left">
                    <h2 className="marketing-faq-heading">
                        Frequently Asked <span className="italic">Questions</span>
                    </h2>
                    <div className="marketing-faq-list">
                        {marketingFaqData.map((item, index) => (
                            <div className="marketing-faq-item" key={index}>
                                <div className="marketing-faq-question" onClick={() => toggleFAQ(index)}>
                                    <span>{item.question}</span>
                                    <span>{openIndex === index ? '−' : '+'}</span>
                                </div>
                                {openIndex === index && (
                                    <div className="marketing-faq-answer">{item.answer}</div>
                                )}
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="marketing-faq-right">
                    <MarketingGrowthAnimation />
                </div>
            </div>
        );
    };

    return (
        <section className="marketing-services-section">
            <div className="marketing-services-header">
                <h1>
                    Digital <em>Marketing</em>
                </h1>
            </div>
            <div className="marketing-services-content">
                <div className="marketing-benefits">
                    <h4>Benefits</h4>
                    <p>
                        We create <strong>data-driven</strong> marketing campaigns that amplify your brand reach, boost
                        <strong> customer engagement</strong>, and <strong>drive measurable growth</strong> across all channels.
                    </p>
                    <button className="schedule-strategy-call">
                        Schedule Strategy Call
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className={`growth-star-${i + 1}`}>
                                <svg viewBox="0 0 784.11 815.53">
                                    <path
                                        className="schedule-strategy-call-fil0"
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                    />
                                </svg>
                            </div>
                        ))}
                    </button>
                </div>
                <div className="marketing-solutions">
                    <h4>Services</h4>
                    <ul>
                        <li className='first-marketing-service'><span>01</span> Social Media Marketing</li>
                        <li><span>02</span> Email Marketing Campaigns</li>
                        <li><span>03</span> Content Marketing Strategy</li>
                        <li><span>04</span> PPC & Paid Advertising</li>
                        <li><span>05</span> Brand Development & Strategy</li>
                        <li><span>06</span> Marketing Analytics & Reporting</li>
                    </ul>
                </div>
            </div>

            {/* Marketing Campaigns Carousel Section */}
            <MarketingCampaignsCarousel />

            {/* Marketing FAQ Section */}
            <MarketingFaqSection />

            <CTAform />
        </section>
    );
};

export default MarketingServicesSection;