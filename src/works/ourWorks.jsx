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

// Project names data
const projectNames = {
  branding: [
    'Rapoo', 'Wrogn', 'Mediskin', 
    'Sarin Skin', 'OneMile', 'Miraggio',
    'McCoy', 'The Wedding School', 'Indian Oil'
  ],
  uiux: [
    'E-commerce Website', 'Mobile App Interface', 'Dashboard Design', 
    'User Experience Redesign', 'Web Application UI', 'Mobile UX Research',
    'Interactive Website', 'App Prototype Design', 'User Interface System'
  ],
  power: [
    'Latest Portfolio Showcase', 'Recent Design Project', 'New Brand Launch',
    'Modern Web Design', 'Creative Campaign', 'Innovation Project',
    'Latest UI Design', 'Fresh Brand Identity'
  ],
  animation: [
    '2D Character Animation', '3D Motion Graphics', 'Explainer Video Animation',
    'Logo Animation Design', 'Product Demo Animation', 'Brand Story Animation',
    'Interactive Animation', '3D Visual Effects', 'Motion Design Project'
  ],
  video: [
    'Corporate Video Production', 'Product Launch Video', 'Brand Commercial',
    'Promotional Video Edit', 'Social Media Video', 'Marketing Video Campaign',
    'Documentary Production', 'Event Highlight Reel'
  ],
  arvr: [
    '3D Product Visualization', 'Architectural Rendering', 'Product 3D Model',
    '3D Animation Render', 'Realistic 3D Scene', 'Virtual Environment Design',
    '3D Character Model', 'Product Photography 3D'
  ],
  marketing: [
    'Digital Marketing Campaign', 'Social Media Strategy', 'PPC Campaign Management',
    'Content Marketing Project', 'SEO Optimization Campaign', 'Email Marketing Design',
    'Conversion Rate Optimization', 'Brand Awareness Campaign', 'Lead Generation Project'
  ],
  graphic: [
    'Print Design Project', 'Poster Design', 'Business Card Design',
    'Brochure Layout', 'Packaging Design', 'Magazine Layout',
    'Advertisement Design', 'Event Graphics', 'Marketing Collateral'
  ]
};

const generateImages = () => {
  const all = [];
  Object.entries(imageCategories).forEach(([category, ids]) => {
    ids.forEach((id, index) => {
      const categoryProjects = projectNames[category] || [];
      const projectName = categoryProjects[index] || `${category.charAt(0).toUpperCase() + category.slice(1)} Project ${index + 1}`;
      all.push({ 
        category, 
        id, 
        uniqueKey: `${category}-${id}`,
        projectName 
      });
    });
  });
  return all;
};

const OurWorks = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [animationTriggered, setAnimationTriggered] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const portfolioRef = useRef(null);
  const observerRef = useRef(null);

  const allImages = generateImages();
  const itemsPerPage = 12; // Items per page for "All" category

  // Filter images based on category and search term
  // const filteredImages = allImages.filter(img => {
  //   const matchesCategory = activeCategory === 'all' || img.category === activeCategory;
  //   // const matchesSearch = img.id.toString().includes(searchTerm);
  //   const matchesSearch = img.id.toString().includes(searchTerm) ||
  //                     img.category.toLowerCase().includes(searchTerm);

  //   return matchesCategory && matchesSearch;
  // });

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
        <h1>Our <span>Work</span></h1>
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
            <div className="portfolio-overlay">
              <div className="project-name">
                {img.projectName}
              </div>
            </div>
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