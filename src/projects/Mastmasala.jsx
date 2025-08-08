import React from 'react';
import './Mastmasala.css'; // Import the CSS file

// Import all images at the top of the file
// Note: Adjusted import paths based on your file structure
import Mastmasala1 from '../assets/Mast Masala/mm1.webp';
import Mastmasala2 from '../assets/Mast Masala/mm2.webp';
import Mastmasala3 from '../assets/Mast Masala/mm3.webp';
import Mastmasala4 from '../assets/Mast Masala/mm4.webp';
import Mastmasala5 from '../assets/Mast Masala/mm5.webp';
import Mastmasala6 from '../assets/Mast Masala/mm6.webp';
import Mastmasala7 from '../assets/Mast Masala/mm7.webp';

const MastmasalaGallery = () => {
    // Gallery items - mix of images and videos
    const galleryItems = [
        { type: 'image', src: Mastmasala1, name: 'Mastmasala1.webp' },
        { type: 'image', src: Mastmasala2, name: 'Mastmasala2.webp' },
        { type: 'image', src: Mastmasala3, name: 'Mastmasala3.webp' },
        { type: 'image', src: Mastmasala4, name: 'Mastmasala4.webp' },
        { type: 'image', src: Mastmasala5, name: 'Mastmasala5.webp' },
        { type: 'image', src: Mastmasala6, name: 'Mastmasala6.webp' },
        { type: 'image', src: Mastmasala7, name: 'Mastmasala7.webp' },
    ];

    const handleImageError = (e, item) => {
        console.error(`Failed to load image: ${item.name || item.src}`);
        console.error('Import result:', item.src);

        e.target.className = 'mastmasala-image mastmasala-image-error';
        e.target.innerHTML = `
            <div class="mastmasala-error-message">
                <div class="mastmasala-error-title">Image not found</div>
                <div class="mastmasala-error-filename">${item.name || 'Unknown'}</div>
                <div class="mastmasala-error-path">${item.src}</div>
            </div>
        `;
    };

    const handleImageLoad = (item) => {
        console.log(`Successfully loaded: ${item.name || item.src}`);
    };

    return (
        <div className="mastmasala-showcase">
            {galleryItems.map((item, index) => (
                <div
                    key={index}
                    className="mastmasala-item"
                >
                    <img
                        src={item.src}
                        alt={`Mastmasala showcase ${index + 1}`}
                        className="mastmasala-image"
                        loading="lazy"
                        onError={(e) => handleImageError(e, item)}
                        onLoad={() => handleImageLoad(item)}
                    />
                </div>
            ))}
        </div>
    );
};

export default MastmasalaGallery;