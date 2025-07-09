import React, { useEffect, useRef } from "react";
import "./cursor.css"; // Keep the styles clean in a separate CSS file

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
      }
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="cursor" ref={cursorRef}>
      <div className="inner-cursor">+</div>
    </div>
  );
};

export default CustomCursor;
