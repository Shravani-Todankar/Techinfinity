import React, { useState, useEffect, useRef } from 'react';
import './seo.css';

const SEOTeamCarousel = () => {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(3);

  const teamMembers = [
    { id: 1, name: "Vikas Mishra", role: "Team Leader", image: "https://picsum.photos/seed/vikas/400/600" },
    { id: 2, name: "Aryadeep Jadhav", role: "Executive", image: "https://picsum.photos/seed/arya/400/600" },
    { id: 3, name: "Akshay Walunj", role: "Executive", image: "https://picsum.photos/seed/akshay/400/600" },
    { id: 4, name: "Vishal Nirmal", role: "Executive", image: "https://picsum.photos/seed/vishal/400/600" },
    { id: 5, name: "Nakiya", role: "Executive", image: "https://picsum.photos/seed/nakiya/400/600" },
    { id: 6, name: "Jagruti Singh", role: "Executive", image: "https://picsum.photos/seed/jagruti/400/600" }
  ];

  const createExtendedSEOItems = () => {
    const cloneCount = Math.max(visibleItemsCount, 3);
    const clonedStart = [...teamMembers.slice(-cloneCount)];
    const clonedEnd = [...teamMembers.slice(0, cloneCount)];
    return [...clonedStart, ...teamMembers, ...clonedEnd];
  };

  const extendedItems = createExtendedSEOItems();

  const calculateVisibleSEOItems = () => {
    if (!containerRef.current || !itemWidth) return 3;
    const containerWidth = containerRef.current.offsetWidth;
    const itemsWithGap = Math.floor(containerWidth / itemWidth);
    return Math.max(1, Math.min(itemsWithGap, teamMembers.length));
  };

  const calculateSEODimensions = () => {
    if (!containerRef.current) return;

    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);

    requestAnimationFrame(() => {
      const firstItem = containerRef.current?.querySelector('.seo-team-carousel__item');
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

  const initializeSEOCarousel = () => {
    const cloneCount = Math.max(visibleItemsCount, 3);
    const initialIndex = cloneCount;
    setCurrentIndex(initialIndex);

    setTimeout(() => {
      moveSEOCarousel(initialIndex, true);
      setIsInitialized(true);
    }, 100);
  };

  const moveSEOCarousel = (newIndex, isInstant = false) => {
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
          moveSEOCarousel(resetIndex, true);
        } else if (newIndex < cloneCount) {
          const resetIndex = totalItems - cloneCount - teamMembers.length;
          setCurrentIndex(resetIndex);
          moveSEOCarousel(resetIndex, true);
        }
      }, 800);
    }
  };

  const getSEOActiveItemIndex = (index) => {
    const cloneCount = Math.max(visibleItemsCount, 3);
    const normalizedIndex = index - cloneCount;
    return ((normalizedIndex % teamMembers.length) + teamMembers.length) % teamMembers.length;
  };

  const isSEOActiveItem = (index) => {
    return index === currentIndex;
  };

  useEffect(() => {
    const handleResize = () => {
      calculateSEODimensions();
    };

    calculateSEODimensions();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (itemWidth > 0 && !isInitialized) {
      initializeSEOCarousel();
    }
  }, [itemWidth, visibleItemsCount]);

  useEffect(() => {
    if (isInitialized && itemWidth > 0) {
      moveSEOCarousel(currentIndex);
    }
  }, [currentIndex, isInitialized, itemWidth, isMobile]);

  const handlePrevSEO = () => {
    setCurrentIndex(prev => prev - 1);
  };

  const handleNextSEO = () => {
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="seo-team-carousel" ref={containerRef}>
      <h3 className='seo-head'>SEO Team</h3>
      <div
        className="seo-team-carousel__track"
        ref={trackRef}
        style={{
          opacity: isInitialized ? 1 : 0,
          transition: isInitialized ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
        }}
      >
        {extendedItems.map((member, index) => (
          <div
            key={`seo-${member.id}-${index}`}
            className={`seo-team-carousel__item ${
              isSEOActiveItem(index) ? 'seo-team-carousel__item--active' : ''
            }`}
          >
            <div className="seo-team-carousel__card">
              <div className="seo-team-carousel__image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="seo-team-carousel__content">
                <h3 className="seo-team-carousel__name">{member.name}</h3>
                <p className="seo-team-carousel__role">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="seo-team-carousel__navigation">
        <button
          className="seo-team-carousel__nav seo-team-carousel__nav--prev"
          onClick={handlePrevSEO}
          disabled={!isInitialized}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className="seo-team-carousel__nav seo-team-carousel__nav--next"
          onClick={handleNextSEO}
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

export default SEOTeamCarousel;
