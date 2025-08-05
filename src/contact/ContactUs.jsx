import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';
import L from 'leaflet';
// Logos
import Logo1 from '../assets/Falling-Logos/Wrogn.png';
import Logo2 from '../assets/Falling-Logos/McCoy.png';
import Logo3 from '../assets/Falling-Logos/MumbaiIndians.png';
import Logo4 from '../assets/Falling-Logos/ICICI.png';
import Logo5 from '../assets/Falling-Logos/MG-Group.png'
import Logo6 from '../assets/Falling-Logos/Miraggio.png';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        message: '',
        name: '',
        email: '',
        howDidYouHear: ''
    });

    // Map-related refs and state
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    // Location coordinates (approximate based on addresses)
    const locations = [
        {
            name: "Techinfinity HQ",
            address: "2A Majestic mansion, 380, Sardar Vallabhbhai Patel Rd, Prathna Samaj, Mumbai, Maharashtra 400004",
            lat: 18.9667, // Approximate coordinates for the area
            lng: 72.8147,
            type: "headquarters"
        },
        {
            name: "Techinfinity Office",
            address: "Ground Floor, Edwankar House, Nawalkar Lane, Charni Road, Prathna Samaj, Mumbai, Maharashtra 400004",
            lat: 18.9645, // Approximate coordinates for Charni Road area
            lng: 72.8156,
            type: "office"
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        // Handle form submission here
        alert('Thank you for your message! We\'ll get back to you soon.');
    };

    // Map initialization useEffect
    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Fix for default markers in Leaflet with React
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Initialize the map with Google Maps-like styling
        const map = L.map(mapRef.current, {
            center: [18.9656, 72.8151], // Center between both locations
            zoom: 15,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            dragging: true,
            zoomControl: true
        });

        mapInstanceRef.current = map;

        // Add light-colored map tiles similar to Google Maps
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Simple custom markers
        const hqIcon = L.divIcon({
            html: `
                <div class="simple-marker-hq">
                    <div class="marker-dot"></div>
                </div>
            `,
            className: 'custom-div-icon',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        const officeIcon = L.divIcon({
            html: `
                <div class="simple-marker-office">
                    <div class="marker-dot"></div>
                </div>
            `,
            className: 'custom-div-icon',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        // Add markers for each location without popups
        locations.forEach(location => {
            const icon = location.type === 'headquarters' ? hqIcon : officeIcon;
            L.marker([location.lat, location.lng], { icon }).addTo(map);
        });

        // Fit map to show both markers
        const group = new L.featureGroup(
            locations.map(loc => L.marker([loc.lat, loc.lng]))
        );
        map.fitBounds(group.getBounds().pad(0.1));

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-grid">
                    {/* Left Column - Contact Form */}
                    <div className="form-section">
                        <div className="contact-form-header">
                            <p className="contact-label">CONTACT</p>
                            <h1 className="main-title">Drop us a line</h1>
                        </div>

                        <div className="form-fields">
                            <div className="field-group">
                                <label className="field-label">
                                    How can we help?
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="textarea-field"
                                    placeholder="Tell us about your project or question..."
                                />
                            </div>

                            <div className="field-group">
                                <label className="field-label">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="field-group">
                                <label className="field-label">
                                    Your Company Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    placeholder="name@company.com"
                                />
                            </div>

                            <div className="field-group">
                                <label className="field-label">
                                    How did you hear about us?
                                </label>
                                <input
                                    type="text"
                                    name="howDidYouHear"
                                    value={formData.howDidYouHear}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    placeholder="Google, referral, social media, etc."
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="contact-submit-btn"
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Info Section */}
                    <div className="info-section">
                        <div className="info-content">
                            <h2 className="info-title">We are here to help!</h2>
                            <p className="info-description">
                                No matter what stage your idea or project is in. Let's meet to discuss and plan the next steps to make it happen in the most efficient way. 🤝
                            </p>

                            <button className="schedule-btn">
                                Schedule a Call
                            </button>
                        </div>

                        {/* Client Logos */}
                        <div className="client-logos">
                            <div className="logos-grid">
                                <div className="contact-logo">
                                    <img src={Logo1} alt="WROGN" />
                                </div>
                                <div className="contact-logo">
                                    <img src={Logo2} alt="Rapoo" />
                                </div>
                                <div className="contact-logo">
                                    <img src={Logo3} alt="Mumbai Indians" />
                                </div>
                                <div className="contact-logo">
                                    <img src={Logo4} alt="ICICI" />
                                </div>
                                <div className="contact-logo">
                                    <img src={Logo5} alt="MG Group" />
                                </div>
                                <div className="contact-logo">
                                    <img src={Logo6} alt="Miraggio" />
                                </div>
                            </div>
                        </div>

                        {/* Testimonial */}
                        <div className="testimonial">
                            <blockquote className="testimonial-quote">
                                The future belongs to those who believe in the beauty of their dreams.
                                <br />
                                - Eleanor Roosevelt
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Office Locations Section */}
                <div className="office-locations-section">
                    <div className="office-section-header">
                        <p className="office-section-label">CONTACT</p>
                        <h2 className="office-section-title">Our offices</h2>
                    </div>

                    <div className="office-locations-grid">
                        {/* Techinfinity HQ */}
                        <div className="office-location-card">
                            <div className="office-header-info">
                                <h3 className="office-location-title">Techinfinity HQ</h3>
                            </div>

                            <div className="office-address-block">
                                <p className="office-full-address">
                                    2A Majestic mansion, 380, Sardar Vallabhbhai Patel Rd, Prathna Samaj, Mumbai, Maharashtra 400004
                                </p>
                                <p className="office-landmark">
                                    Landmark: Quality Wines
                                </p>
                            </div>

                            <div className="office-contact-details">
                                <div className="office-detail-item">
                                    <p className="office-detail-label">ASSISTANCE HOURS:</p>
                                    <p className="office-detail-value">Mon - Sat : 10 am to 7 pm IST</p>
                                </div>
                            </div>
                        </div>

                        {/* Techinfinity Branch */}
                        <div className="office-location-card">
                            <div className="office-header-info">
                                <h3 className="office-location-title">Techinfinity</h3>
                            </div>

                            <div className="office-address-block">
                                <p className="office-full-address">
                                    Ground Floor, Edwankar House, Nawalkar Lane, Charni Road, Prathna Samaj, Mumbai, Maharashtra 400004
                                </p>
                            </div>

                            <div className="office-contact-details">
                                <div className="office-detail-item">
                                    <p className="office-detail-label">CALL DIRECTLY</p>
                                    <p className="office-phone-number">
                                        Wh: &nbsp;
                                        <a href="tel:+91 98333 88717" className="office-phone-number-link">
                                            +91 98333 88717
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Map Section */}
                <div className="map-section">
                    <div className="map-section-header">
                        <p className="map-section-label">LOCATION</p>
                        <h2 className="map-section-title">Find us on the map</h2>
                    </div>

                    <div className="map-container">
                        {/* Map Container */}
                        <div className="map-wrapper">
                            <div
                                ref={mapRef}
                                className="map-element"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;