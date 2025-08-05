import React from 'react';
import './Lakme.css'; // Import the CSS file

// Import all images at the top of the file
// Note: Adjusted import paths based on your file structure
import Lakme1 from '../assets/Lakme/Lakme1.gif';
import Lakme2 from '../assets/Lakme/Lakme2.gif';
import Lakme3 from '../assets/Lakme/Lakme3.gif';
import Lakme4 from '../assets/Lakme/Lakme4.gif';
import Lakme5 from '../assets/Lakme/Lakme5.gif';
import Lakme6 from '../assets/Lakme/Lakme6.webp';
import Lakme7 from '../assets/Lakme/Lakme7.gif';
import Lakme8 from '../assets/Lakme/Lakme8.webp';
import VideoImg from '../assets/Lakme/video.png';

const LakmeGallery = () => {
    // Gallery items - mix of images and videos
    const galleryItems = [
        { type: 'image', src: Lakme1, name: 'Lakme1.gif' },
        { type: 'image', src: Lakme2, name: 'Lakme2.gif' },
        { type: 'image', src: Lakme3, name: 'Lakme3.gif' },
        { type: 'image', src: Lakme4, name: 'Lakme4.gif' },
        { type: 'image', src: Lakme5, name: 'Lakme5.gif' },
        { 
            type: 'video', 
            src: VideoImg, 
            name: 'Thumbnail Video',
            embedId: '1089286127' // Keep this for potential future use
        },
        { type: 'image', src: Lakme6, name: 'Lakme6.webp' },
        { type: 'image', src: Lakme7, name: 'Lakme7.gif' },
        { type: 'image', src: Lakme8, name: 'Lakme8.webp' },
    ];

    const handleImageError = (e, item) => {
        console.error(`Failed to load image: ${item.name || item.src}`);
        console.error('Import result:', item.src);

        e.target.className = 'lakme-image lakme-image-error';
        e.target.innerHTML = `
            <div class="lakme-error-message">
                <div class="lakme-error-title">Image not found</div>
                <div class="lakme-error-filename">${item.name || 'Unknown'}</div>
                <div class="lakme-error-path">${item.src}</div>
            </div>
        `;
    };

    const handleImageLoad = (item) => {
        console.log(`Successfully loaded: ${item.name || item.src}`);
    };

    return (
        <div className="lakme-showcase">
            {galleryItems.map((item, index) => (
                <div
                    key={index}
                    className="lakme-item"
                >
                    {item.type === 'image' ? (
                        <img
                            src={item.src}
                            alt={`Lakme showcase ${index + 1}`}
                            className="lakme-image"
                            loading="lazy"
                            onError={(e) => handleImageError(e, item)}
                            onLoad={() => handleImageLoad(item)}
                        />
                    ) : (
                        <div className="lakme-video-container">
                            <img
                                src={item.src}
                                alt={`Lakme video thumbnail ${index + 1}`}
                                className="lakme-image"
                                loading="lazy"
                                onError={(e) => handleImageError(e, item)}
                                onLoad={() => handleImageLoad(item)}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default LakmeGallery;