import React, { useEffect, useRef, useState } from 'react';
import "../App.css";

const SectionThree = () => {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const [elementsData, setElementsData] = useState([]);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        // Wait a bit for the SVG to render completely
        const timer = setTimeout(() => {
            const paths = svg.querySelectorAll("path, line");
            
            // Group elements by layers
            const newElementsData = Array.from(paths).map((path, index) => {
                const length = path.getTotalLength();
                let layer = 0;
                
                // Determine which layer this element belongs to
                if (index >= 0 && index <= 3) {
                    layer = 0; // Top curves layer
                } else if (index >= 4 && index <= 7) {
                    layer = 1; // Middle vertical lines layer
                } else if (index >= 8 && index <= 11) {
                    layer = 2; // Bottom curves layer
                }
                
                return {
                    element: path,
                    length: length,
                    layer: layer,
                    index: index
                };
            });
            
            // Initialize stroke properties
            newElementsData.forEach(data => {
                data.element.style.strokeDasharray = data.length;
                data.element.style.strokeDashoffset = data.length;
            });

            setElementsData(newElementsData);
        }, 100);

        return () => clearTimeout(timer);
    }, []);



    return (
        <section className="section-three">
            <div 
                ref={containerRef}
                className="w-full bg-white"
                style={{ minHeight: '100vh', position: 'relative' }}
            >
                {/* Fixed SVG overlay */}
                <svg
                    ref={svgRef}
                    width="1410"
                    height="2346"
                    viewBox="0 0 1410 2346"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
                    style={{ transform: 'scaleY(-1)' }}
                >
                    {/* LAYER 1: ALL TOP CURVES (animate first) - REVERSED DIRECTION */}
                    <path 
                        d="M585.997 2345C585.997 2345 602.83 2115.5 293.33 2101.5C-16.1704 2087.5 0.661991 1858 0.661991 1858"
                        stroke="#3793D0"
                        fill="none"
                        strokeWidth="1"
                    />
                    <path 
                        d="M673.738 2345C673.738 2345 683.42 2189.5 585 2101.5C486.58 2013.5 496.262 1858 496.262 1858"
                        stroke="#3793D0"
                        fill="none"
                        strokeWidth="1"
                    />
                    <path 
                        d="M745.262 2345C745.262 2345 735.58 2189.5 834 2101.5C932.42 2013.5 922.738 1858 922.738 1858"
                        stroke="#3793D0"
                        fill="none"
                        strokeWidth="1"
                    />
                    <path 
                        d="M823.162 2345C823.162 2345 806.33 2115.5 1115.83 2101.5C1425.33 2087.5 1408.5 1858 1408.5 1858"
                        stroke="#3793D0"
                        fill="none"
                        strokeWidth="1"
                    />
                    
                    {/* LAYER 2: ALL MIDDLE VERTICAL LINES (animate second) */}
                    <line 
                        x1="0.661991" 
                        y1="1858" 
                        x2="0.661991" 
                        y2="488"
                        stroke="#3793D0"
                        fill="none"
                        strokeWidth="1"
                    />
                    <line 
                        x1="496.262" 
                        y1="1858" 
                        x2="496.262" 
                        y2="488"
                        stroke="#3793D0"
                        fill="none"
                        strokeWidth="1"
                    />
                    <line 
                        x1="922.738" 
                        y1="1858" 
                        x2="922.738" 
                        y2="488"
                        stroke="#3793D0"
                        fill="none"
                        strokeWidth="1"
                    />
                    <line 
                        x1="1408.5" 
                        y1="1858" 
                        x2="1408.5" 
                        y2="488"
                        stroke="#3793D0"
                        fill="none"
                        strokeWidth="1"
                    />
                    
                    {/* LAYER 3: ALL BOTTOM CURVES (animate last) */}
                    <path 
                        d="M0.661991 488C0.661991 488 -16.1704 258.5 293.33 244.5C602.83 230.5 585.997 1 585.997 1"
                        stroke="#3793D0"
                        fill="none"
                        strokeWidth="1"
                    />
                    <path 
                        d="M496.262 488C496.262 488 486.58 332.5 585 244.5C683.42 156.5 673.738 1 673.738 1"
                        stroke="#3793D0"
                        fill="none"
                        strokeWidth="1"
                    />
                    <path 
                        d="M922.738 488C922.738 488 932.42 332.5 834 244.5C735.58 156.5 745.262 1 745.262 1"
                        stroke="#3793D0"
                        fill="none"
                        strokeWidth="1"
                    />
                    <path 
                        d="M1408.5 488C1408.5 488 1425.33 258.5 1115.83 244.5C806.33 230.5 823.162 1 823.162 1"
                        stroke="#3793D0"
                        fill="none"
                        strokeWidth="1"
                    />
                </svg>
            </div>
        </section>
    );
};

export default SectionThree;