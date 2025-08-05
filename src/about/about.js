import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Simple fade-up animation on scroll for text elements
const createBasicTextReveal = (element, options = {}) => {
  if (!element) return;

  const {
    trigger = element,
    start = "top 85%",
    duration = 1.2,
    ease = "power3.out",
    delay = 0
  } = options;

  gsap.fromTo(element,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: duration,
      ease: ease,
      delay: delay,
      scrollTrigger: {
        trigger: trigger,
        start: start,
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    }
  );
};

// Clip-path reveal animation for paragraphs
const createClipPathReveal = (element, options = {}) => {
  if (!element) return;

  const {
    trigger = element,
    start = "top 85%",
    duration = 1.5,
    ease = "power4.out",
    delay = 0
  } = options;

  gsap.fromTo(element,
    {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      opacity: 0,
    },
    {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
      opacity: 1,
      duration: duration,
      ease: ease,
      delay: delay,
      scrollTrigger: {
        trigger: trigger,
        start: start,
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    }
  );
};

// Enhanced image reveal animation
const createMaskReveal = (element, options = {}) => {
  if (!element) return;

  const {
    trigger = element,
    start = "top 80%",
    duration = 1.5,
    ease = "power4.out",
    direction = "up",
    delay = 0
  } = options;

  let clipPathStart, clipPathEnd, yMove;

  switch (direction) {
    case 'down':
      clipPathStart = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
      clipPathEnd = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      yMove = -40;
      break;
    case 'left':
      clipPathStart = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
      clipPathEnd = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      yMove = 0;
      break;
    case 'right':
      clipPathStart = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)';
      clipPathEnd = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      yMove = 0;
      break;
    default: // up
      clipPathStart = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
      clipPathEnd = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      yMove = 40;
  }

  gsap.fromTo(element,
    {
      clipPath: clipPathStart,
      opacity: 0,
      scale: 1.05,
      y: yMove
    },
    {
      clipPath: clipPathEnd,
      opacity: 1,
      scale: 1,
      y: 0,
      duration: duration,
      ease: ease,
      delay: delay,
      scrollTrigger: {
        trigger: trigger,
        start: start,
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// Timeline specific animations
const createTimelineContentAnimation = (element, options = {}) => {
  if (!element) return;

  const {
    trigger = element,
    start = "top 80%",
    duration = 1.2,
    ease = "power3.out",
    delay = 0
  } = options;

  // Animate the timeline content
  const content = element.querySelector('.timeline-story-content');
  const year = element.querySelector('.timeline-story-year');
  
  if (content) {
    gsap.fromTo(content,
      {
        opacity: 0,
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: duration,
        ease: ease,
        delay: delay,
        scrollTrigger: {
          trigger: trigger,
          start: start,
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }

  if (year) {
    gsap.fromTo(year,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(2)",
        delay: delay + 0.2,
        scrollTrigger: {
          trigger: trigger,
          start: start,
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }
};

// Timeline line progressive reveal
const createTimelineLineAnimation = () => {
  const timelineLine = document.querySelector('.timeline-story-line');
  if (!timelineLine) return;

  gsap.fromTo(timelineLine,
    {
      scaleY: 0,
      transformOrigin: "top center"
    },
    {
      scaleY: 1,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".timeline-story-container",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    }
  );
};

// Animate main title
const createMainTitleAnimation = () => {
  const mainTitle = document.querySelector('.timeline-main-title');
  if (!mainTitle) return;

  gsap.fromTo(mainTitle,
    {
      opacity: 0,
      y: -50,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: mainTitle,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    }
  );
};

// Initialize animations
export const initAboutAnimations = (refs) => {
  const ctx = gsap.context(() => {

    // Main title animation
    createMainTitleAnimation();

    // Timeline line animation
    createTimelineLineAnimation();

    // Story Section (Timeline Item)
    if (refs.storyRef?.current) {
      createTimelineContentAnimation(refs.storyRef.current, { delay: 0.2 });
      
      const h3 = refs.storyRef.current.querySelector('h3');
      const paragraphs = refs.storyRef.current.querySelectorAll('p');

      if (h3) {
        createBasicTextReveal(h3, { duration: 1.2, delay: 0.6 });
      }

      paragraphs.forEach((p, index) => {
        createClipPathReveal(p, {
          delay: 0.8 + index * 0.2
        });
      });
    }

    // Journey Section (Timeline Item)
    if (refs.journeyRef?.current) {
      createTimelineContentAnimation(refs.journeyRef.current, { delay: 0.2 });
      
      const h3 = refs.journeyRef.current.querySelector('h3');
      const paragraphs = refs.journeyRef.current.querySelectorAll('p');

      if (h3) {
        createBasicTextReveal(h3, { duration: 1.2, delay: 0.6 });
      }

      paragraphs.forEach((p, index) => {
        createClipPathReveal(p, {
          delay: 0.8 + index * 0.2
        });
      });
    }

    // Future Section (Timeline Item)
    if (refs.futureRef?.current) {
      createTimelineContentAnimation(refs.futureRef.current, { delay: 0.2 });
      
      const h3 = refs.futureRef.current.querySelector('h3');
      const paragraphs = refs.futureRef.current.querySelectorAll('p');

      if (h3) {
        createBasicTextReveal(h3, { duration: 1.2, delay: 0.6 });
      }

      paragraphs.forEach((p, index) => {
        createClipPathReveal(p, {
          delay: 0.8 + index * 0.2
        });
      });
    }

    // Achievements
    if (refs.achievementsRef?.current) {
      const achievements = refs.achievementsRef.current.children;

      gsap.fromTo(achievements,
        {
          opacity: 0,
          y: 60,
          scale: 0.8,
          rotationX: -45
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: refs.achievementsRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Team Section
    if (refs.teamRef?.current) {
      const h2 = refs.teamRef.current.querySelector('h2');
      const description = refs.teamRef.current.querySelector('.team-description');

      if (h2) {
        createBasicTextReveal(h2, { duration: 1.2 });
      }

      if (description) {
        createClipPathReveal(description, { delay: 0.5 });
      }

      const gridItems = refs.teamRef.current.querySelectorAll('.grid-item');
      gridItems.forEach((item, index) => {
        createMaskReveal(item, {
          trigger: refs.teamRef.current.querySelector('.team-grid'),
          start: "top 85%",
          duration: 1.5,
          direction: index % 2 === 0 ? 'up' : 'down',
          delay: index * 0.1
        });
      });
    }

    // Dream Squad Section
    if (refs.dreamRef?.current) {
      const h1 = refs.dreamRef.current.querySelector('h1');
      const paragraph = refs.dreamRef.current.querySelector('p');

      if (h1) {
        createBasicTextReveal(h1, { duration: 1.2 });
      }

      if (paragraph) {
        createClipPathReveal(paragraph, { delay: 0.6 });
      }
    }

    // Directors Section
    if (refs.directorRef?.current) {
      const heading = refs.directorRef.current.querySelector('.director-head');
      const directors = refs.directorRef.current.querySelectorAll('.ronak, .omkar, .hemant');

      if (heading) {
        createBasicTextReveal(heading, { duration: 1.2 });
      }

      directors.forEach((director, index) => {
        const img = director.querySelector('img');
        const text = director.querySelector('.director-designation');

        if (img) {
          createMaskReveal(img, {
            trigger: refs.directorRef.current.querySelector('.director-imgs'),
            start: "top 80%",
            duration: 1.5,
            direction: 'up',
            delay: index * 0.2
          });
        }

        if (text) {
          gsap.fromTo(text,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.5 + index * 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: refs.directorRef.current.querySelector('.director-imgs'),
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }

    // Other images and placeholders
    const images = document.querySelectorAll('.story-image, .item, .future-item');
    images.forEach((img, index) => {
      createMaskReveal(img, {
        trigger: img.closest('section') || img.closest('div'),
        start: "top 75%",
        duration: 1.5,
        direction: index % 2 === 0 ? 'left' : 'right',
        delay: index * 0.1
      });
    });

  });

  return ctx;
};

// Cleanup function
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
};