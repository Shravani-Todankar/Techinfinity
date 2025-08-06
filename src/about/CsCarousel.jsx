import React, { useState, useEffect, useRef } from 'react';
import './cs.css';

const CsTeamCarousel = () => {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(3);

  const teamMembers = [
    { id: 1, name: "Heinika Kukreja", role: "Executive", image: "https://picsum.photos/seed/heinika/400/600" },
    { id: 2, name: "Sakshi Bohra", role: "Executive", image: "https://picsum.photos/seed/sakshi/400/600" },
    { id: 3, name: "Auriel D'souza", role: "Executive", image: "https://picsum.photos/seed/auriel/400/600" },
    { id: 4, name: "Saima Ansari", role: "Executive", image: "https://picsum.photos/seed/saima/400/600" },
    { id: 5, name: "Tapasya Jain", role: "Executive", image: "https://picsum.photos/seed/tapasya/400/600" }
  ];

  const CSCreateExtendedItems = () => {
    const cloneCount = Math.max(visibleItemsCount, 3);
    const clonedStart = [...teamMembers.slice(-cloneCount)];
    const clonedEnd = [...teamMembers.slice(0, cloneCount)];
    return [...clonedStart, ...teamMembers, ...clonedEnd];
  };

  const extendedItems = CSCreateExtendedItems();

  const CSCalculateVisibleItems = () => {
    if (!containerRef.current || !itemWidth) return 3;
    const containerWidth = containerRef.current.offsetWidth;
    const itemsWithGap = Math.floor(containerWidth / itemWidth);
    return Math.max(1, Math.min(itemsWithGap, teamMembers.length));
  };

  const CSCalculateDimensions = () => {
    if (!containerRef.current) return;

    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);

    requestAnimationFrame(() => {
      const firstItem = containerRef.current?.querySelector('.clientservice-team-carousel__item');
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

  const CSInitializeCarousel = () => {
    const cloneCount = Math.max(visibleItemsCount, 3);
    const initialIndex = cloneCount;
    setCurrentIndex(initialIndex);

    setTimeout(() => {
      CSMoveCarousel(initialIndex, true);
      setIsInitialized(true);
    }, 100);
  };

  const CSMoveCarousel = (newIndex, isInstant = false) => {
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
          CSMoveCarousel(resetIndex, true);
        } else if (newIndex < cloneCount) {
          const resetIndex = totalItems - cloneCount - teamMembers.length;
          setCurrentIndex(resetIndex);
          CSMoveCarousel(resetIndex, true);
        }
      }, 800);
    }
  };

  const CSIsActiveItem = (index) => {
    return index === currentIndex;
  };

  useEffect(() => {
    const handleResize = () => {
      CSCalculateDimensions();
    };

    CSCalculateDimensions();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (itemWidth > 0 && !isInitialized) {
      CSInitializeCarousel();
    }
  }, [itemWidth, visibleItemsCount]);

  useEffect(() => {
    if (isInitialized && itemWidth > 0) {
      CSMoveCarousel(currentIndex);
    }
  }, [currentIndex, isInitialized, itemWidth, isMobile]);

  const CSHandlePrev = () => {
    setCurrentIndex(prev => prev - 1);
  };

  const CSHandleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="clientservice-team-carousel" ref={containerRef}>
      <h3 className='clientservice-head'>Client Servicing Team</h3>
      <div
        className="clientservice-team-carousel__track"
        ref={trackRef}
        style={{
          opacity: isInitialized ? 1 : 0,
          transition: isInitialized ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
        }}
      >
        {extendedItems.map((member, index) => (
          <div
            key={`clientservice-${member.id}-${index}`}
            className={`clientservice-team-carousel__item ${
              CSIsActiveItem(index) ? 'clientservice-team-carousel__item--active' : ''
            }`}
          >
            <div className="clientservice-team-carousel__card">
              <div className="clientservice-team-carousel__image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="clientservice-team-carousel__content">
                <h3 className="clientservice-team-carousel__name">{member.name}</h3>
                <p className="clientservice-team-carousel__role">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="clientservice-team-carousel__navigation">
        <button
          className="clientservice-team-carousel__nav clientservice-team-carousel__nav--prev"
          onClick={CSHandlePrev}
          disabled={!isInitialized}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className="clientservice-team-carousel__nav clientservice-team-carousel__nav--next"
          onClick={CSHandleNext}
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

export default CsTeamCarousel;
