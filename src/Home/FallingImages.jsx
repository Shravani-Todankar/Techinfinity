import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";
import './FallingImages.css';

const FallingImages = ({
  className = '',
  images = [], // Array of image objects: [{ src: 'path/to/image.jpg', alt: 'Alt text', highlighted: false }]
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 0.56,
  mouseConstraintStiffness = 0.9,
  imageWidth = 130,
  imageHeight = 60
}) => {
  const containerRef = useRef(null);
  const imagesRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const [effectStarted, setEffectStarted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Create image elements and wait for them to load
  useEffect(() => {
    if (!imagesRef.current || images.length === 0) return;

    let loadedCount = 0;
    const totalImages = images.length;

    const newHTML = images
      .map((image, index) => {
        const highlightedClass = image.highlighted ? "highlighted" : "";
        return `<img 
          class="falling-image ${highlightedClass}" 
          src="${image.src}" 
          alt="${image.alt || `Image ${index + 1}`}"
          data-index="${index}"
          loading="lazy"
        />`;
      })
      .join("");

    imagesRef.current.innerHTML = newHTML;

    // Wait for all images to load
    const imageElements = imagesRef.current.querySelectorAll(".falling-image");
    
    if (imageElements.length === 0) {
      setImagesLoaded(true);
      return;
    }

    imageElements.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
      }
    });

    if (loadedCount === totalImages) {
      setImagesLoaded(true);
    }
  }, [images]);

  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { 
          threshold: 0.3, // Start animation when 30% of the section is visible
          rootMargin: "-50px 0px" // Add some margin for better timing
        }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted || !imagesLoaded) return;

    const {
      Engine,
      Render,
      World,
      Bodies,
      Runner,
      Mouse,
      MouseConstraint,
    } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) {
      return;
    }

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    const imageElements = imagesRef.current.querySelectorAll(".falling-image");
    const imageBodies = [...imageElements].map((elem) => {
      const rect = elem.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2,
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: 0
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
      return { elem, body };
    });

    imageBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = "none";
    });

    // Create mouse and mouse constraint
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...imageBodies.map((ib) => ib.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Set up canvas for both dragging and scrolling
    let wheelHandler = null;
    let mouseDownHandler = null;

    if (render.canvas) {
      // Allow canvas to receive mouse events for dragging
      render.canvas.style.pointerEvents = 'auto';
      render.canvas.style.touchAction = 'pan-y';

      // Define event handlers
      wheelHandler = (e) => {
        // If we're not dragging anything, allow scroll to bubble up
        if (!mouseConstraint.body) {
          // Let the scroll event bubble up to parent elements
          return true;
        } else {
          // If dragging, prevent scroll
          e.preventDefault();
          e.stopPropagation();
        }
      };

      mouseDownHandler = (e) => {
        // Check if mouse is over a physics body
        const rect = render.canvas.getBoundingClientRect();
        const mousePosition = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        
        const bodies = Matter.Query.point(imageBodies.map(ib => ib.body), mousePosition);
        
        if (bodies.length === 0) {
          // Not over a body, allow event to bubble for potential scrolling
          e.stopPropagation();
          return;
        }
      };

      // Add event listeners
      render.canvas.addEventListener('wheel', wheelHandler, { passive: false });
      render.canvas.addEventListener('mousedown', mouseDownHandler, { passive: true });
    }

    const updateLoop = () => {
      imageBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine);
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      // Clean up event listeners
      if (render.canvas && wheelHandler && mouseDownHandler) {
        render.canvas.removeEventListener('wheel', wheelHandler);
        render.canvas.removeEventListener('mousedown', mouseDownHandler);
      }
      
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, [
    effectStarted,
    imagesLoaded,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
  ]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-images-container ${className}`}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "40px",
      }}
    >
      <div
        ref={imagesRef}
        className="falling-images-target"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      />
      <div 
        ref={canvasContainerRef} 
        className="falling-images-canvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default FallingImages;