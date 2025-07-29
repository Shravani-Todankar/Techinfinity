// CustomCursor.jsx
import React, { useEffect, useState } from 'react';
import './cursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <span className="plus-sign">+</span>
    </div>
  );
};

export default CustomCursor;








// import React, { useEffect, useRef } from "react";
// import "./cursor.css"; // Keep the styles clean in a separate CSS file

// const CustomCursor = () => {
//   const cursorRef = useRef(null);

//   useEffect(() => {
//     const moveCursor = (e) => {
//       const cursor = cursorRef.current;
//       if (cursor) {
//         cursor.style.top = `${e.clientY}px`;
//         cursor.style.left = `${e.clientX}px`;
//       }
//     };

//     document.addEventListener("mousemove", moveCursor);

//     return () => {
//       document.removeEventListener("mousemove", moveCursor);
//     };
//   }, []);

//   return (
//     <div className="cursor" ref={cursorRef}>
//       <div className="inner-cursor">+</div>
//     </div>
//   );
// };

// export default CustomCursor;
