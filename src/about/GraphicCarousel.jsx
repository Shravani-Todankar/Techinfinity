import React, { useState, useEffect, useRef } from 'react';
import './graphic.css';

const GraphicTeamCarousel = () => {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(3);

  const teamMembers = [
    { id: 1, name: "Yogesh Vinchu", role: "Team Leader", image: "https://picsum.photos/seed/yogesh/400/600" },
    { id: 2, name: "Pranay Vinerkar", role: "Executive", image: "https://picsum.photos/seed/pranay/400/600" },
    { id: 3, name: "Sanket Tithe", role: "Sr. Executive", image: "https://picsum.photos/seed/sanket/400/600" },
    { id: 4, name: "Ishwari Hovale", role: "Executive", image: "https://picsum.photos/seed/ishwari/400/600" },
    { id: 5, name: "Shravani Jadhav", role: "Executive", image: "https://picsum.photos/seed/shravanij/400/600" },
    { id: 6, name: "Aditya Shelar", role: "Executive", image: "https://picsum.photos/seed/aditya/400/600" },
    { id: 7, name: "Purvi Mehta", role: "Executive", image: "https://picsum.photos/seed/purvi/400/600" }
  ];

  const createExtendedGraphicItems = () => {
    const cloneCount = Math.max(visibleItemsCount, 3);
    const clonedStart = [...teamMembers.slice(-cloneCount)];
    const clonedEnd = [...teamMembers.slice(0, cloneCount)];
    return [...clonedStart, ...teamMembers, ...clonedEnd];
  };

  const extendedItems = createExtendedGraphicItems();

  const calculateVisibleGraphicItems = () => {
    if (!containerRef.current || !itemWidth) return 3;
    const containerWidth = containerRef.current.offsetWidth;
    const itemsWithGap = Math.floor(containerWidth / itemWidth);
    return Math.max(1, Math.min(itemsWithGap, teamMembers.length));
  };

  const calculateGraphicDimensions = () => {
    if (!containerRef.current) return;

    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);

    requestAnimationFrame(() => {
      const firstItem = containerRef.current?.querySelector('.graphic-team-carousel__item');
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

  const initializeGraphicCarousel = () => {
    const cloneCount = Math.max(visibleItemsCount, 3);
    const initialIndex = cloneCount;
    setCurrentIndex(initialIndex);

    setTimeout(() => {
      moveGraphicCarousel(initialIndex, true);
      setIsInitialized(true);
    }, 100);
  };

  const moveGraphicCarousel = (newIndex, isInstant = false) => {
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
          moveGraphicCarousel(resetIndex, true);
        } else if (newIndex < cloneCount) {
          const resetIndex = totalItems - cloneCount - teamMembers.length;
          setCurrentIndex(resetIndex);
          moveGraphicCarousel(resetIndex, true);
        }
      }, 800);
    }
  };

  const isGraphicActiveItem = (index) => {
    return index === currentIndex;
  };

  useEffect(() => {
    const handleResize = () => {
      calculateGraphicDimensions();
    };

    calculateGraphicDimensions();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (itemWidth > 0 && !isInitialized) {
      initializeGraphicCarousel();
    }
  }, [itemWidth, visibleItemsCount]);

  useEffect(() => {
    if (isInitialized && itemWidth > 0) {
      moveGraphicCarousel(currentIndex);
    }
  }, [currentIndex, isInitialized, itemWidth, isMobile]);

  const handlePrevGraphic = () => {
    setCurrentIndex(prev => prev - 1);
  };

  const handleNextGraphic = () => {
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="graphic-team-carousel" ref={containerRef}>
      <h3 className='graphic-head'>Design Team</h3>
      <div
        className="graphic-team-carousel__track"
        ref={trackRef}
        style={{
          opacity: isInitialized ? 1 : 0,
          transition: isInitialized ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
        }}
      >
        {extendedItems.map((member, index) => (
          <div
            key={`graphic-${member.id}-${index}`}
            className={`graphic-team-carousel__item ${
              isGraphicActiveItem(index) ? 'graphic-team-carousel__item--active' : ''
            }`}
          >
            <div className="graphic-team-carousel__card">
              <div className="graphic-team-carousel__image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="graphic-team-carousel__content">
                <h3 className="graphic-team-carousel__name">{member.name}</h3>
                <p className="graphic-team-carousel__role">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="graphic-team-carousel__navigation">
        <button
          className="graphic-team-carousel__nav graphic-team-carousel__nav--prev"
          onClick={handlePrevGraphic}
          disabled={!isInitialized}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className="graphic-team-carousel__nav graphic-team-carousel__nav--next"
          onClick={handleNextGraphic}
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

export default GraphicTeamCarousel;
