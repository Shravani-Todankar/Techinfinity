import React, { useEffect, useRef, useState, useCallback } from 'react';
import './work.css';
import Sectionseven from "./form";

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Recent', value: 'power' },
  { label: 'Branding Visual Identity', value: 'branding' },
  { label: 'UI/UX and Web Development', value: 'uiux' },
  { label: '2D & 3D Animation', value: 'animation' },
  { label: 'Video Editing', value: 'video' },
  { label: '3D Renders', value: 'arvr' },
  { label: 'Performance Marketing', value: 'marketing' },
  { label: 'Graphic Design', value: 'graphic' },
];

const imageCategories = {
  branding: [1, 11, 21, 31, 41, 51, 61, 71, 81],
  uiux: [2, 12, 22, 32, 42, 52, 62, 72, 82],
  power: [3, 13, 23, 33, 43, 53, 63, 73],
  animation: [5, 15, 25, 35, 45, 55, 65, 75, 85],
  video: [6, 16, 26, 36, 46, 56, 66, 76],
  arvr: [7, 17, 27, 37, 47, 57, 67, 77],
  marketing: [8, 18, 28, 38, 48, 58, 68, 78, 88],
  graphic: [4, 10, 14, 24, 34, 44, 54, 64, 74],
};

const generateImages = () => {
  const all = [];
  Object.entries(imageCategories).forEach(([category, ids]) => {
    ids.forEach(id => {
      all.push({ category, id, uniqueKey: `${category}-${id}` });
    });
  });
  return all;
};

const OurWorks = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const portfolioRef = useRef(null);
  const observerRef = useRef(null);

  const allImages = generateImages();
  const itemsPerPage = 9; // Items per page for "All" category

  // Filter images based on category and search term
  const filteredImages = allImages.filter(img => {
    const matchesCategory = activeCategory === 'all' || img.category === activeCategory;
    
    // Find the category object for this image
    const categoryObj = categories.find(cat => cat.value === img.category);
    const categoryLabel = categoryObj ? categoryObj.label.toLowerCase() : '';
    
    // Check if search term matches ID, internal category name, or display label
    const matchesSearch = img.id.toString().includes(searchTerm) ||
                         img.category.toLowerCase().includes(searchTerm) ||
                         categoryLabel.includes(searchTerm);
  
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination for current filtered images
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get images for current page
  const currentImages = activeCategory === 'all' 
    ? filteredImages.slice(startIndex, endIndex)
    : filteredImages; // Show all images for specific categories

  // Calculate pagination buttons to show
  const getPaginationButtons = () => {
    if (activeCategory !== 'all') return []; // No pagination for specific categories
    
    const buttons = [];
    const maxButtons = 6;
    
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      // Always show first page
      buttons.push(1);
      
      if (currentPage > 3) {
        buttons.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!buttons.includes(i)) {
          buttons.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        buttons.push('...');
      }
      
      // Always show last page
      if (!buttons.includes(totalPages)) {
        buttons.push(totalPages);
      }
    }
    
    return buttons;
  };

  // Cleanup function for intersection observer
  const cleanupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  // Set up intersection observer
  useEffect(() => {
    // Clean up previous observer
    cleanupObserver();

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setAnimationTriggered(true);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px',
    });

    observerRef.current = observer;

    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }

    return cleanupObserver;
  }, [cleanupObserver]);

  // Handle category change
  const handleCategoryChange = useCallback((categoryValue) => {
    setActiveCategory(categoryValue);
    setCurrentPage(1); // Reset to first page when changing category
    
    // Reset animation state with a small delay to avoid conflicts
    setAnimationTriggered(false);
    
    // Re-trigger animation after a brief moment
    setTimeout(() => {
      setAnimationTriggered(true);
    }, 50);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    if (page === '...' || page === currentPage) return;
    
    setCurrentPage(page);
    setAnimationTriggered(false);
    
    // Re-trigger animation after a brief moment
    setTimeout(() => {
      setAnimationTriggered(true);
    }, 50);

    // Scroll to top of portfolio grid
    if (portfolioRef.current) {
      portfolioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="works-container">
      <div className="work-heading">
        <h1>Our <span>Works</span></h1>
      </div>

      <div className="search-section">
        <div className="search-container">
          <div className="search-icon">
            🔍
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search projects..."
            onChange={e => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      </div>

      <div className="tabs-section">
        {categories.map(cat => (
          <button
            key={cat.value}
            className={`tab ${activeCategory === cat.value ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Show pagination info for "All" category */}
      {activeCategory === 'all' && (
        <div className="pagination-info">
          <p>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredImages.length)} of {filteredImages.length} projects
            {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
        </div>
      )}

      <div className="portfolio-grid" ref={portfolioRef}>
        {currentImages.map((img, index) => (
          <div
            key={img.uniqueKey}
            className={`portfolio-item ${animationTriggered ? 'slide-up' : ''}`}
            style={{ 
              animationDelay: animationTriggered ? `${index * 0.1}s` : '0s'
            }}
          >
            <img
              src={`https://picsum.photos/300/250?random=${img.id}`}
              className="portfolio-image"
              alt={`Portfolio item ${img.id}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Show pagination only for "All" category and when there are multiple pages */}
      {activeCategory === 'all' && totalPages > 1 && (
        <div className="pagination">
          {/* Previous button */}
          <button
            className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹ Prev
          </button>

          {/* Page numbers */}
          {getPaginationButtons().map((page, index) => (
            <button
              key={index}
              className={`pagination-number ${
                page === currentPage ? 'active' : ''
              } ${page === '...' ? 'ellipsis' : ''}`}
              onClick={() => handlePageChange(page)}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}

          {/* Next button */}
          <button
            className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ›
          </button>
        </div>
      )}
      <Sectionseven />
    </div>
  );
};

export default OurWorks;
