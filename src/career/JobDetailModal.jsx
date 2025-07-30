import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import emailjs from "@emailjs/browser";
import { getJobById } from './JobData';
import './JobDetailModal.css';

const JobDetailPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null,
        privacyAccepted: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Get job data based on ID from URL
    const job = getJobById(jobId);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (file && file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            e.target.value = '';
            return;
        }

        setFormData(prev => ({
            ...prev,
            resume: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');
        setErrorMessage('');

        try {
            // Step 1: Validate all fields are filled
            console.log('=== DEBUGGING EMAIL SUBMISSION ===');
            console.log('Form Data:', {
                firstName: formData.firstName,
                email: formData.email,
                phone: formData.phone,
                coverLetter: formData.coverLetter.substring(0, 50) + '...',
                resumeFile: formData.resume ? formData.resume.name : 'No file',
                privacyAccepted: formData.privacyAccepted
            });

            // Validate required fields
            if (!formData.firstName.trim()) {
                throw new Error('Please enter your full name');
            }
            if (!formData.email.trim()) {
                throw new Error('Please enter your email address');
            }
            if (!formData.phone.trim()) {
                throw new Error('Please enter your phone number');
            }
            if (!formData.coverLetter.trim()) {
                throw new Error('Please write a cover letter');
            }
            if (!formData.resume) {
                throw new Error('Please upload your resume');
            }
            if (!formData.privacyAccepted) {
                throw new Error('Please accept the privacy policy');
            }

            console.log('✅ All validation passed');

            // Step 2: Check EmailJS configuration
            const EMAILJS_CONFIG = {
                serviceId: 'service_ng8vwpg', // Verify this ID in your EmailJS dashboard
                templateId: 'template_hqpvjfj', // Verify this ID in your EmailJS dashboard
                publicKey: 'RJLD8dq0rITmdxB-Z' // Verify this key in your EmailJS dashboard
            };

            console.log('📧 EmailJS Config:', EMAILJS_CONFIG);

            // Step 3: Initialize EmailJS
            try {
                emailjs.init(EMAILJS_CONFIG.publicKey);
                console.log('✅ EmailJS initialized successfully');
            } catch (initError) {
                console.error('❌ EmailJS initialization failed:', initError);
                throw new Error('EmailJS initialization failed');
            }

            // Step 4: Prepare template parameters
            const templateParams = {
                to_name: 'HR Team',
                from_name: formData.firstName,
                from_email: formData.email,
                phone: formData.phone,
                job_title: job?.title || 'Unknown Position',
                job_department: job?.department || 'Unknown Department',
                job_location: job?.location || 'Unknown Location',
                cover_letter: formData.coverLetter,
                application_date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                reply_to: formData.email,
                resume_name: formData.resume ?
                    `Resume: ${formData.resume.name} (${(formData.resume.size / 1024 / 1024).toFixed(2)} MB)` :
                    'No resume attached'
            };

            console.log('📝 Template Parameters:', templateParams);

            // Step 5: Send email
            console.log('🚀 Attempting to send email...');

            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams,
                EMAILJS_CONFIG.publicKey
            );

            console.log('📨 EmailJS Response:', response);

            if (response.status === 200) {
                console.log('✅ Email sent successfully!');
                setSubmitStatus('success');

                // Reset form
                setFormData({
                    firstName: '',
                    email: '',
                    phone: '',
                    coverLetter: '',
                    resume: null,
                    privacyAccepted: false
                });

                // Clear file input
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) fileInput.value = '';

                // Redirect after 3 seconds
                setTimeout(() => {
                    navigate('/careers');
                }, 3000);
            } else {
                throw new Error(`EmailJS returned status: ${response.status}`);
            }

        } catch (error) {
            console.error('❌ SUBMISSION ERROR:', error);
            console.error('Error details:', {
                message: error.message,
                status: error.status,
                text: error.text,
                name: error.name
            });

            setSubmitStatus('error');

            // Handle different types of errors with more specific messages
            let errorMsg = '';

            if (error.message && error.message.includes('Please')) {
                errorMsg = error.message;
            } else if (error.status === 400) {
                errorMsg = 'Invalid request - Check your EmailJS Service ID, Template ID, and Public Key in the dashboard';
            } else if (error.status === 401) {
                errorMsg = 'Authentication failed - Check your EmailJS Public Key';
            } else if (error.status === 402) {
                errorMsg = 'EmailJS service limit reached - Upgrade your plan or try again later';
            } else if (error.status === 404) {
                errorMsg = 'EmailJS service or template not found - Check your Service ID and Template ID';
            } else if (error.text) {
                errorMsg = `EmailJS Error: ${error.text}`;
            } else if (error.message) {
                errorMsg = error.message;
            } else {
                errorMsg = 'Unknown error occurred. Please try again.';
            }

            setErrorMessage(errorMsg);

            setTimeout(() => {
                setSubmitStatus('');
                setErrorMessage('');
            }, 10000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate('/careers');
    };

    if (!job) {
        return (
            <div className="job-detail-page">
                <div className="job-not-found">
                    <h2>Job not found</h2>
                    <Link to="/careers" className="back-to-careers">
                        Back to Careers
                    </Link>
                </div>
            </div>
        );
    }

    const renderOverview = () => (
        <div className="job-overview-content">
            <div className="job-overview-header">
                <h2 className="job-detail-title">{job.title}</h2>
                <div className="job-detail-meta">
                    <span className="job-meta-item">On-Site</span>
                    <span className="job-meta-separator">•</span>
                    <span className="job-meta-item">{job.company}</span>
                    <span className="job-meta-separator">•</span>
                    <span className="job-meta-item">{job.type}</span>
                    <span className="job-meta-separator">•</span>
                    <span className="job-meta-item">{job.department}</span>
                </div>
                <div className="job-detail-tags">
                    <div className="job-location-tag">{job.location}</div>
                    <div className="job-salary-tag">{job.salary}</div>
                    <div className="job-experience-tag">{job.experience}</div>
                </div>
            </div>

            <div className="job-description-section">
                <h3>Description</h3>
                <div className="job-description-text">
                    <p>{job.overview.description}</p>

                    <h4>What makes this role exciting?</h4>
                    <p>{job.overview.whatMakesRoleExciting}</p>

                    <h4>Key Responsibilities:</h4>
                    <ul>
                        {job.overview.keyResponsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                        ))}
                    </ul>

                    <h4>Requirements:</h4>
                    <ul>
                        {job.overview.requirements.map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                        ))}
                    </ul>

                    <h4>Preferred Qualifications:</h4>
                    <ul>
                        {job.overview.preferredQualifications.map((qualification, index) => (
                            <li key={index}>{qualification}</li>
                        ))}
                    </ul>

                    <h4>Benefits:</h4>
                    <ul>
                        {job.overview.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>

                    <p>Ready to take your career to the next level? We'd love to hear from you!</p>
                </div>
            </div>
        </div>
    );

    const renderApplication = () => (
        <div className="job-application-content">
            <form onSubmit={handleSubmit} className="job-application-form">
                <div className="application-form-section">
                    <div className="application-form-group">
                        <label className="application-form-label">Full Name *</label>
                        <input
                            type="text"
                            className="application-form-input"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                            disabled={isSubmitting}
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="application-form-group">
                        <label className="application-form-label">Email *</label>
                        <input
                            type="email"
                            className="application-form-input"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            disabled={isSubmitting}
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div className="application-form-group">
                        <label className="application-form-label">Phone *</label>
                        <input
                            type="tel"
                            className="application-form-input"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            required
                            disabled={isSubmitting}
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>

                    <div className="application-form-group">
                        <label className="application-form-label">Cover Letter *</label>
                        <textarea
                            className="application-form-textarea"
                            value={formData.coverLetter}
                            onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                            rows={6}
                            required
                            disabled={isSubmitting}
                            placeholder="Tell us why you're interested in this position and what makes you a great fit for our team..."
                        />
                    </div>

                    <div className="application-form-group">
                        <label className="application-form-label">Upload CV/Resume *</label>
                        <div className="application-file-upload-wrapper">
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                accept=".pdf,.doc,.docx"
                                required
                                className="application-file-input"
                                disabled={isSubmitting}
                            />
                            <small className="application-file-info">
                                Allowed formats: PDF, DOC, DOCX (Max size: 5MB)
                                {formData.resume && (
                                    <span style={{ color: '#007bff', fontWeight: '500' }}>
                                        <br />✓ Selected: {formData.resume.name}
                                    </span>
                                )}
                            </small>
                        </div>
                    </div>

                    <div className="application-form-group application-checkbox-group">
                        <label className="application-checkbox-label">
                            <input
                                type="checkbox"
                                className="application-checkbox-input"
                                checked={formData.privacyAccepted}
                                onChange={(e) => handleInputChange('privacyAccepted', e.target.checked)}
                                required
                                disabled={isSubmitting}
                            />
                            By using this form you agree with the storage and handling of your data by this website. *
                        </label>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#d4edda',
                            color: '#155724',
                            border: '1px solid #c3e6cb',
                            borderRadius: '6px',
                            marginBottom: '1rem',
                            textAlign: 'center'
                        }}>
                            ✅ Application submitted successfully!<br />
                            <small>Redirecting to careers page in 3 seconds...</small>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#f8d7da',
                            color: '#721c24',
                            border: '1px solid #f5c6cb',
                            borderRadius: '6px',
                            marginBottom: '1rem'
                        }}>
                            ❌ {errorMessage}
                            <br />
                            <small style={{ fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>
                                💡 Check browser console (F12) for detailed error information
                            </small>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="application-submit-btn"
                        disabled={isSubmitting}
                        style={{
                            opacity: isSubmitting ? 0.6 : 1,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="job-detail-page">
            <div className="job-detail-header">
                <div className="job-header-content">
                    <button className="back-btn" onClick={handleBack}>
                        <ArrowLeft size={20} />
                        Back to Jobs
                    </button>
                </div>
            </div>

            <div className="job-detail-container">
                <div className="job-tabs">
                    <button
                        className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        OVERVIEW
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'application' ? 'active' : ''}`}
                        onClick={() => setActiveTab('application')}
                    >
                        APPLICATION
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'overview' ? renderOverview() : renderApplication()}
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;