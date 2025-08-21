import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import "./AnimatedTestimonials.css";

const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
    const [active, setActive] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const containerRef = useRef(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    const getImagePosition = (index) => {
        const diff = index - active;
        const totalImages = testimonials.length;

        if (diff === 0) return 'position-0';
        if (diff === 1 || diff === -(totalImages - 1)) return 'position-1';
        if (diff === 2 || diff === -(totalImages - 2)) return 'position-2';
        if (diff === -1 || diff === totalImages - 1) return 'position-3';
        if (diff === -2 || diff === totalImages - 2) return 'position-4';
        return 'position-hidden';
    };

    const onTouchStart = (e) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrev();
        }
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                handleNext();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div
            className="animated-testimonials-container"
            ref={containerRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className="animated-testimonials-grid">
                {/* Left Side: Stacked Images */}
                <div>
                    <div className="image-wrapper">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial.src}-${index}`}
                                className={`image-slide ${getImagePosition(index)}`}
                            >
                                <img
                                    src={testimonial.src}
                                    alt={testimonial.name}
                                    draggable={false}
                                    className={`testimonial-image ${index === active ? 'active' : ''}`}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Text + Buttons */}
                <div className="testimonial-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <h3 className="testimonial-name">{testimonials[active].name}</h3>
                            <p className="testimonial-role">{testimonials[active].designation}</p>
                            <motion.div className="testimonial-quote">
                                {testimonials[active].quote.split(" ").map((word, index) => (
                                    <motion.span
                                        key={`${active}-${index}`}
                                        initial={{ filter: "blur(8px)", opacity: 0, y: 8 }}
                                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.25,
                                            ease: "easeOut",
                                            delay: 0.03 * index,
                                        }}
                                        className="inline-block"
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="testimonial-buttons">
                        <button
                            onClick={handlePrev}
                            className="nav-btn"
                            aria-label="Previous testimonial"
                            type="button"
                        >
                            <IconArrowLeft className="icon" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="nav-btn primary"
                            aria-label="Next testimonial"
                            type="button"
                        >
                            <IconArrowRight className="icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedTestimonials;