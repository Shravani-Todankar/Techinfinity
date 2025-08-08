import React from 'react';
import './Kunuts.css'; // Import the CSS file

// Import all images at the top of the file
// Note: Adjusted import paths based on your file structure
import Kunuts1 from '../assets/Kunuts/kunuts1.webp';
import Kunuts2 from '../assets/Kunuts/kunuts2.webp';
import Kunuts3 from '../assets/Kunuts/kunuts3.webp';
import Kunuts4 from '../assets/Kunuts/kunuts4.webp';
import Kunuts5 from '../assets/Kunuts/kunuts5.webp';
import Kunuts6 from '../assets/Kunuts/kunuts6.webp';
import Kunuts7 from '../assets/Kunuts/kunuts7.webp';
import Kunuts8 from '../assets/Kunuts/kunuts8.webp';
import Kunuts9 from '../assets/Kunuts/kunuts9.webp';
import Kunuts10 from '../assets/Kunuts/kunuts10.webp';
import Kunuts11 from '../assets/Kunuts/kunuts11.webp';
import Kunuts12 from '../assets/Kunuts/kunuts12.webp';
import Kunuts13 from '../assets/Kunuts/kunuts13.webp';
import Kunuts14 from '../assets/Kunuts/kunuts14.webp';
import VideoImg from '../assets/Kunuts/kunutsVideo.png';

const KunutsGallery = () => {
    // Gallery items - mix of images and videos
    const galleryItems = [
        { type: 'image', src: Kunuts1, name: 'Kunuts1.gif' },
        { type: 'image', src: Kunuts2, name: 'Kunuts2.gif' },
        { type: 'image', src: Kunuts3, name: 'Kunuts3.gif' },
        { type: 'image', src: Kunuts4, name: 'Kunuts4.gif' },
        { type: 'image', src: Kunuts5, name: 'Kunuts5.gif' },
        { 
            type: 'video', 
            src: VideoImg, 
            name: 'Thumbnail Video',
            embedId: '1089286127' // Keep this for potential future use
        },
        { type: 'image', src: Kunuts6, name: 'Kunuts6.webp' },
        { type: 'image', src: Kunuts7, name: 'Kunuts7.gif' },
        { type: 'image', src: Kunuts8, name: 'Kunuts8.webp' },
        { type: 'image', src: Kunuts9, name: 'Kunuts9.webp' },
        { type: 'image', src: Kunuts10, name: 'Kunuts10.webp' },
        { type: 'image', src: Kunuts11, name: 'Kunuts11.webp' },
        { type: 'image', src: Kunuts12, name: 'Kunuts12.webp' },
        { type: 'image', src: Kunuts13, name: 'Kunuts13.webp' },
        { type: 'image', src: Kunuts14, name: 'Kunuts14.webp' },
    ];

    const handleImageError = (e, item) => {
        console.error(`Failed to load image: ${item.name || item.src}`);
        console.error('Import result:', item.src);

        e.target.className = 'kunuts-image kunuts-image-error';
        e.target.innerHTML = `
            <div class="kunuts-error-message">
                <div class="kunuts-error-title">Image not found</div>
                <div class="kunuts-error-filename">${item.name || 'Unknown'}</div>
                <div class="kunuts-error-path">${item.src}</div>
            </div>
        `;
    };

    const handleImageLoad = (item) => {
        console.log(`Successfully loaded: ${item.name || item.src}`);
    };

    return (
        <div className="kunuts-showcase">
            {galleryItems.map((item, index) => (
                <div
                    key={index}
                    className="kunuts-item"
                >
                    {item.type === 'image' ? (
                        <img
                            src={item.src}
                            alt={`Kunuts showcase ${index + 1}`}
                            className="kunuts-image"
                            loading="lazy"
                            onError={(e) => handleImageError(e, item)}
                            onLoad={() => handleImageLoad(item)}
                        />
                    ) : (
                        <div className="kunuts-video-container">
                            <img
                                src={item.src}
                                alt={`Kunuts video thumbnail ${index + 1}`}
                                className="kunuts-image"
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

export default KunutsGallery;