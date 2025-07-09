import React, { useState, useEffect, useRef } from 'react';
import './dev.css';

const Developercarousel = () => {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(3);

  const teamMembers = [
    {
      id: 1,
      name: "Vivek Pandey",
      role: "Team Leader",
      image: "https://picsum.photos/seed/vivek/400/600"
    },
    {
      id: 2,
      name: "Kunal Darji",
      role: "Sr. Developer",
      image: "https://picsum.photos/seed/kunal/400/600"
    },
    {
      id: 3,
      name: "Ziaa Shaikh",
      role: "Sr. Developer",
      image: "https://picsum.photos/seed/ziaa/400/600"
    },
    {
      id: 4,
      name: "Shravani Todankar",
      role: "Jr. Developer",
      image: "https://picsum.photos/seed/shravani/400/600"
    }
  ];

  const createExtendedItems = () => {
    const cloneCount = Math.max(visibleItemsCount, 3);
    const clonedStart = [...teamMembers.slice(-cloneCount)];
    const clonedEnd = [...teamMembers.slice(0, cloneCount)];
    return [...clonedStart, ...teamMembers, ...clonedEnd];
  };

  const extendedItems = createExtendedItems();

  const calculateVisibleItems = () => {
    if (!containerRef.current || !itemWidth) return 3;
    const containerWidth = containerRef.current.offsetWidth;
    const itemsWithGap = Math.floor(containerWidth / itemWidth);
    return Math.max(1, Math.min(itemsWithGap, teamMembers.length));
  };

  const calculateDimensions = () => {
    if (!containerRef.current) return;

    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);

    requestAnimationFrame(() => {
      const firstItem = containerRef.current?.querySelector('.developer-team-carousel__item');
      if (firstItem) {
        const itemRect = firstItem.getBoundingClientRect();
        const calculatedWidth = itemRect.width + 20;
        setItemWidth(calculatedWidth);

        if (!mobile) {
          const visibleCount = Math.floor(containerRef.current.offsetWidth / calculatedWidth);
          setVisibleItemsCount(Math.max(1, Math.min(visibleCount, teamMembers.length)));
        } else {
          setVisibleItemsCount(1);
        }
      }
    });
  };

  const initializeCarousel = () => {
    const cloneCount = Math.max(visibleItemsCount, 3);
    const initialIndex = cloneCount;
    setCurrentIndex(initialIndex);

    setTimeout(() => {
      moveCarousel(initialIndex, true);
      setIsInitialized(true);
    }, 100);
  };

  const moveCarousel = (newIndex, isInstant = false) => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = isInstant ? 'none' : 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    const transform = isMobile
      ? `translateX(-${newIndex * 100}%)`
      : `translateX(-${newIndex * itemWidth}px)`;

    track.style.transform = transform;

    if (!isInstant) {
      setTimeout(() => {
        const cloneCount = Math.max(visibleItemsCount, 3);
        const totalItems = extendedItems.length;

        if (newIndex >= totalItems - cloneCount) {
          const resetIndex = cloneCount;
          setCurrentIndex(resetIndex);
          moveCarousel(resetIndex, true);
        } else if (newIndex < cloneCount) {
          const resetIndex = totalItems - cloneCount - teamMembers.length;
          setCurrentIndex(resetIndex);
          moveCarousel(resetIndex, true);
        }
      }, 800);
    }
  };

  const isActiveItem = (index) => {
    return index === currentIndex;
  };

  useEffect(() => {
    const handleResize = () => {
      calculateDimensions();
    };

    calculateDimensions();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (itemWidth > 0 && !isInitialized) {
      initializeCarousel();
    }
  }, [itemWidth, visibleItemsCount]);

  useEffect(() => {
    if (isInitialized && itemWidth > 0) {
      moveCarousel(currentIndex);
    }
  }, [currentIndex, isInitialized, itemWidth, isMobile]);

  const handlePrev = () => {
    setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="developer-team-carousel" ref={containerRef}>
      <h3 className="developer-head">Developer Team</h3>
      <div
        className="developer-team-carousel__track"
        ref={trackRef}
        style={{
          opacity: isInitialized ? 1 : 0,
          transition: isInitialized ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
        }}
      >
        {extendedItems.map((member, index) => (
          <div
            key={`dev-${member.id}-${index}`}
            className={`developer-team-carousel__item ${
              isActiveItem(index) ? 'developer-team-carousel__item--active' : ''
            }`}
          >
            <div className="developer-team-carousel__card">
              <div className="developer-team-carousel__image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="developer-team-carousel__content">
                <h3 className="developer-team-carousel__name">{member.name}</h3>
                <p className="developer-team-carousel__role">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="developer-team-carousel__navigation">
        <button
          className="developer-team-carousel__nav developer-team-carousel__nav--prev"
          onClick={handlePrev}
          disabled={!isInitialized}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className="developer-team-carousel__nav developer-team-carousel__nav--next"
          onClick={handleNext}
          disabled={!isInitialized}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Developercarousel;
