import React from 'react';
import './Orra.css'; // Import the CSS file

// Import all images at the top of the file
// Note: Adjusted import paths based on your file structure
import Orra1 from '../assets/Orra/orra1.webp';
import Orra2 from '../assets/Orra/orra2.webp';
import Orra3 from '../assets/Orra/orra3.webp';
import Orra4 from '../assets/Orra/orra4.webp';
import Orra5 from '../assets/Orra/orra5.webp';
import Orra6 from '../assets/Orra/orra6.webp';
import Orra7 from '../assets/Orra/orra7.webp';

const OrraGallery = () => {
    // Gallery items - mix of images and videos
    const galleryItems = [
        { type: 'image', src: Orra1, name: 'Orra1.webp' },
        { type: 'image', src: Orra2, name: 'Orra2.webp' },
        { type: 'image', src: Orra3, name: 'Orra3.webp' },
        { type: 'image', src: Orra4, name: 'Orra4.webp' },
        { type: 'image', src: Orra5, name: 'Orra5.webp' },
        { type: 'image', src: Orra6, name: 'Orra6.webp' },
        { type: 'image', src: Orra7, name: 'Orra7.webp' },
    ];

    const handleImageError = (e, item) => {
        console.error(`Failed to load image: ${item.name || item.src}`);
        console.error('Import result:', item.src);

        e.target.className = 'orra-image orra-image-error';
        e.target.innerHTML = `
            <div class="orra-error-message">
                <div class="orra-error-title">Image not found</div>
                <div class="orra-error-filename">${item.name || 'Unknown'}</div>
                <div class="orra-error-path">${item.src}</div>
            </div>
        `;
    };

    const handleImageLoad = (item) => {
        console.log(`Successfully loaded: ${item.name || item.src}`);
    };

    return (
        <div className="orra-showcase">
            {galleryItems.map((item, index) => (
                <div
                    key={index}
                    className="orra-item"
                >
                    <img
                        src={item.src}
                        alt={`Orra showcase ${index + 1}`}
                        className="orra-image"
                        loading="lazy"
                        onError={(e) => handleImageError(e, item)}
                        onLoad={() => handleImageLoad(item)}
                    />
                </div>
            ))}
        </div>
    );
};

export default OrraGallery;