import React, { useEffect, useRef, useState } from 'react';
import './service.css';
import CTAform from "../works/form.jsx";

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

            {/* Mounting the FAQ Section */}
            <FaqSection />

            <CTAform />
        </section>
    );
};

export default WebDevelopmentSection;
