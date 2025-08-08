import React from 'react';
import './RapooMI.css'; // Import the CSS file

// Import all images at the top of the file
import RapooMI1 from '../assets/Rapoo/Rapoo1.gif';
import RapooMI2 from '../assets/Rapoo/Rapoo2.gif';
import RapooMI3 from '../assets/Rapoo/Rapoo3.webp';
import RapooMI4 from '../assets/Rapoo/Rapoo4.gif';
import RapooMI4_1 from '../assets/Rapoo/Rapoo4-1.jpg';
import RapooMI5 from '../assets/Rapoo/Rapoo5.gif';
import RapooMI6 from '../assets/Rapoo/Rapoo6.gif';
import RapooMI7 from '../assets/Rapoo/Rapoo7.webp';
import RapooMI8 from '../assets/Rapoo/Rapoo8.gif';
import RapooMI9 from '../assets/Rapoo/Rapoo9.webp';
import RapooMI10 from '../assets/Rapoo/Rapoo10.gif';
import RapooMI11 from '../assets/Rapoo/Rapoo11.webp';
import RapooMI12 from '../assets/Rapoo/Rapoo12.webp';
import RapooMI13 from '../assets/Rapoo/Rapoo13.webp';
import RapooMI14 from '../assets/Rapoo/Rapoo14.webp';
import RapooMI15 from '../assets/Rapoo/Rapoo15.gif';
import RapooMI16 from '../assets/Rapoo/Rapoo16.jpg';
import RapooMI17 from '../assets/Rapoo/Rapoo17.webp';

const RapooMIGallery = () => {
    // Define gallery items with layout information
    const galleryItems = [
        { type: 'single', src: RapooMI1, name: 'rapoo-mi-1.gif', category: 'hero' },
        { type: 'single', src: RapooMI2, name: 'rapoo-mi-2.gif', category: 'key-visual' },
        { type: 'single', src: RapooMI3, name: 'rapoo-mi-3.gif', category: 'logo-reveal' },

        // First 2-column section: RapooMI4.gif & RapooMI4-1.jpg
        {
            type: 'two-column',
            items: [
                { src: RapooMI4, name: 'rapoo-mi-4.gif', category: 'brand-fusion' },
                { src: RapooMI4_1, name: 'rapoo-mi-4-1.jpg', category: 'tech-champion' }
            ]
        },

        { type: 'single', src: RapooMI5, name: 'rapoo-mi-5.gif', category: 'static-brand' },
        { type: 'single', src: RapooMI6, name: 'rapoo-mi-6.gif', category: 'animated-logo' },
        { type: 'single', src: RapooMI7, name: 'rapoo-mi-7.png', category: 'partnership' },
        { type: 'single', src: RapooMI8, name: 'rapoo-mi-8.gif', category: 'social-media' },
        { type: 'single', src: RapooMI9, name: 'rapoo-mi-9.png', category: 'brand-elements' },
        { type: 'single', src: RapooMI10, name: 'rapoo-mi-10.gif', category: 'campaign' },
        { type: 'single', src: RapooMI11, name: 'rapoo-mi-11.png', category: 'final-creative' },
        { type: 'single', src: RapooMI12, name: 'rapoo-mi-12.png', category: 'final-creative' },
        { type: 'single', src: RapooMI13, name: 'rapoo-mi-13.png', category: 'final-creative' },
        { type: 'single', src: RapooMI14, name: 'rapoo-mi-14.png', category: 'final-creative' },

        // Second 2-column section: RapooMI15.gif & RapooMI16.jpg
        {
            type: 'two-column',
            items: [
                { src: RapooMI15, name: 'rapoo-mi-15.gif', category: 'final-creative' },
                { src: RapooMI16, name: 'rapoo-mi-16.jpg', category: 'final-creative' }
            ]
        },

        { type: 'single', src: RapooMI17, name: 'rapoo-mi-17.png', category: 'final-creative' },
    ];

    const handleImageError = (e, item) => {
        console.error(`Failed to load image: ${item.name || item.src}`);
        console.error('Import result:', item.src);

        e.target.className = 'rapoo-mi-image rapoo-mi-image-error';
        e.target.innerHTML = `
            <div class="rapoo-mi-error-message">
                <div class="rapoo-mi-error-title">Image not found</div>
                <div class="rapoo-mi-error-filename">${item.name || 'Unknown'}</div>
                <div class="rapoo-mi-error-path">${item.src}</div>
            </div>
        `;
    };

    const handleImageLoad = (item) => {
        console.log(`Successfully loaded: ${item.name || item.src}`);
    };

    const renderSingleImage = (item, index) => (
        <div key={`single-${index}`} className="rapoo-mi-item">
            <img
                src={item.src}
                alt={`Rapoo Mumbai Indians ${index + 1}`}
                className="rapoo-mi-image"
                loading="lazy"
                onError={(e) => handleImageError(e, item)}
                onLoad={() => handleImageLoad(item)}
            />
        </div>
    );

    const renderTwoColumnSection = (section, index) => (
        <div key={`two-col-${index}`} className="rapoo-mi-two-column-section">
            {section.items.map((item, itemIndex) => (
                <div key={`col-${itemIndex}`} className="rapoo-mi-column">
                    <img
                        src={item.src}
                        alt={`Rapoo Mumbai Indians ${item.name}`}
                        className="rapoo-mi-image rapoo-mi-column-image"
                        loading="lazy"
                        onError={(e) => handleImageError(e, item)}
                        onLoad={() => handleImageLoad(item)}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div className="rapoo-mi-showcase">
            {galleryItems.map((item, index) => {
                if (item.type === 'single') {
                    return renderSingleImage(item, index);
                } else if (item.type === 'two-column') {
                    return renderTwoColumnSection(item, index);
                }
                return null;
            })}
            <p className='project-link'>
                Website: 
                <a href="https://techinfinity.io">Techinfinity.io</a>
            </p>
        </div>
    );
};

export default RapooMIGallery;