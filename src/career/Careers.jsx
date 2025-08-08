import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllJobs } from './JobData';
import './careers.css';

const JobListingsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    department: '',  
    workType: ''
  });

  // Career-focused images for the marquee carousel
  const carouselImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
      alt: "Professional team meeting"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=300&fit=crop",
      alt: "Modern office collaboration"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
      alt: "Team working together in office"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=400&h=300&fit=crop",
      alt: "Diverse team brainstorming"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      alt: "Creative professionals at work"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
      alt: "Career development discussion"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      alt: "Team collaboration workspace"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
      alt: "Professional woman in office"
    }
  ];

  // Get job data from centralized source
  const jobs = getAllJobs();

  // Filter and search logic using useMemo for performance
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search filter - check if search query matches title, company, location, or department
      const matchesSearch = searchQuery === '' || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase());

      // Location filter
      const matchesLocation = filters.location === '' || job.location === filters.location;

      // Department filter
      const matchesDepartment = filters.department === '' || job.department === filters.department;

      // Work type filter
      const matchesWorkType = filters.workType === '' || 
        (filters.workType === 'Full-time' && job.type === 'Full Time') ||
        (filters.workType === 'Internship' && job.type === 'Internship');

      return matchesSearch && matchesLocation && matchesDepartment && matchesWorkType;
    });
  }, [searchQuery, filters, jobs]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({
      location: '',
      department: '',
      workType: ''
    });
  };

  const handleJobClick = (job) => {
    navigate(`/job/${job.id}`);
  };

  const scrollToJobs = () => {
    const jobsSection = document.querySelector('.job-board-header');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const FilterDropdown = ({ label, value, onChange, options = [] }) => (
    <div className="job-filter-dropdown">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="job-filter-select"
      >
        <option value="" disabled>{label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="job-filter-icon" />
    </div>
  );

  const JobCard = ({ job }) => (
    <div className="job-posting-card" onClick={() => handleJobClick(job)}>
      <div className="job-posting-content">
        <div className="job-posting-info">
          <h3 className={`job-posting-title ${job.isHighlighted ? 'job-title-featured' : ''}`}>
            {job.title}
          </h3>
          <div className="job-posting-date">
            Posted {job.posted}
          </div>
        </div>
        <div className="job-location">{job.location}</div>
        <div className="job-company">{job.company}</div>
        <div className="job-employment-type">{job.type}</div>
      </div>
    </div>
  );

  return (
    <div className="job-board-page">
      {/* Careers Hero Section */}
      <div className="careers-hero-section">
        <div className="careers-content">
          {/* Careers Breadcrumb */}
          {/* <div className="careers-breadcrumb">
            <span>• Careers</span>
          </div> */}

          {/* Main Heading */}
          <h1 className="careers-title">
            Embrace life at Techinfinity
          </h1>

          {/* Description and Button */}
          <div className="careers-action-section">
            <span className="careers-description">Get on with it...</span>
            <button className="careers-button" onClick={scrollToJobs}>
              View Open Positions
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Continuous Marquee Carousel */}
        <div className="marquee-container">
          <div className="marquee-track">
            {/* First set of images */}
            {carouselImages.map((image) => (
              <div key={`first-${image.id}`} className="marquee-item">
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {carouselImages.map((image) => (
              <div key={`second-${image.id}`} className="marquee-item">
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Board Header */}
      <div className="job-board-header">
        <div className="job-board-container">
          <h2 className="job-board-title">
            Job Openings
          </h2>
          
          {/* Search Bar */}
          <div className="job-search-container">
            <div className="job-search-icon-wrapper">
              <Search className="job-search-icon" />
            </div>
            <input
              type="text"
              placeholder="Search jobs by title, company, location, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="job-search-input"
            />
          </div>

          {/* Filters */}
          <div className="job-filters-container">
            <div className='location-CR'>
              <p>Charni Road</p>
            </div>
            {/* <FilterDropdown
              label="Location"
              value={filters.location}
              onChange={(value) => handleFilterChange('location', value)}
              options={['Charni Road']}
            /> */}
            <FilterDropdown
              label="Department"
              value={filters.department}
              onChange={(value) => handleFilterChange('department', value)}
              options={['Web Development', 'Graphic Design', 'SEO', 'Marketing', 'Client Servicing']}
            />
            <FilterDropdown
              label="Work type"
              value={filters.workType}
              onChange={(value) => handleFilterChange('workType', value)}
              options={['Full-time', 'Internship']}
            />
            
            {/* Clear Filters Button - only show if filters are active */}
            {(searchQuery || filters.location || filters.department || filters.workType) && (
              <button 
                onClick={clearAllFilters}
                className="clearfilter-button"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="job-postings-container">
        <div className="job-postings-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem', 
              color: '#6b7280',
              fontSize: '1.125rem'
            }}>
              <p>No jobs found matching your criteria.</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingsPage;