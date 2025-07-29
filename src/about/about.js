// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// // Utility function to split text into spans for character-by-character animation
// const splitTextIntoSpans = (element) => {
//   if (!element) return;
  
//   const text = element.textContent;
//   element.innerHTML = '';
  
//   // Split into words, then characters
//   const words = text.split(' ');
//   words.forEach((word, wordIndex) => {
//     const wordSpan = document.createElement('span');
//     wordSpan.style.display = 'inline-block';
//     wordSpan.style.overflow = 'hidden';
    
//     const chars = word.split('');
//     chars.forEach((char, charIndex) => {
//       const charSpan = document.createElement('span');
//       charSpan.textContent = char;
//       charSpan.style.display = 'inline-block';
//       charSpan.style.transform = 'translateY(100%)';
//       charSpan.style.transition = 'none';
//       wordSpan.appendChild(charSpan);
//     });
    
//     element.appendChild(wordSpan);
    
//     // Add space after word (except last word)
//     if (wordIndex < words.length - 1) {
//       const spaceSpan = document.createElement('span');
//       spaceSpan.innerHTML = '&nbsp;';
//       spaceSpan.style.display = 'inline-block';
//       element.appendChild(spaceSpan);
//     }
//   });
// };

// // Advanced text reveal animation similar to Patrick David's style
// const createTextRevealAnimation = (element, options = {}) => {
//   if (!element) return;
  
//   const {
//     trigger = element,
//     start = "top 80%",
//     duration = 1.2,
//     stagger = 0.05,
//     ease = "power3.out",
//     delay = 0
//   } = options;
  
//   // Split text for character animation
//   splitTextIntoSpans(element);
  
//   const chars = element.querySelectorAll('span span');
  
//   // Create the reveal animation
//   gsap.fromTo(chars, 
//     {
//       y: '100%',
//       opacity: 0,
//     },
//     {
//       y: '0%',
//       opacity: 1,
//       duration: duration,
//       stagger: stagger,
//       ease: ease,
//       delay: delay,
//       scrollTrigger: {
//         trigger: trigger,
//         start: start,
//         end: "bottom 20%",
//         toggleActions: "play none none reverse",
//       }
//     }
//   );
// };

// // Clip-path reveal animation for paragraphs
// const createClipPathReveal = (element, options = {}) => {
//   if (!element) return;
  
//   const {
//     trigger = element,
//     start = "top 85%",
//     duration = 1.5,
//     ease = "power4.out",
//     delay = 0
//   } = options;
  
//   gsap.fromTo(element,
//     {
//       clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
//       opacity: 0,
//     },
//     {
//       clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
//       opacity: 1,
//       duration: duration,
//       ease: ease,
//       delay: delay,
//       scrollTrigger: {
//         trigger: trigger,
//         start: start,
//         end: "bottom 20%",
//         toggleActions: "play none none reverse",
//       }
//     }
//   );
// };

// // Mask reveal animation for images and containers
// const createMaskReveal = (element, options = {}) => {
//   if (!element) return;
  
//   const {
//     trigger = element,
//     start = "top 80%",
//     duration = 1.8,
//     ease = "power3.inOut",
//     direction = "up" // up, down, left, right
//   } = options;
  
//   let maskStart, maskEnd;
  
//   switch(direction) {
//     case 'down':
//       maskStart = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
//       maskEnd = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
//       break;
//     case 'left':
//       maskStart = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
//       maskEnd = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
//       break;
//     case 'right':
//       maskStart = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)';
//       maskEnd = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
//       break;
//     default: // up
//       maskStart = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
//       maskEnd = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
//   }
  
//   gsap.fromTo(element,
//     {
//       clipPath: maskStart,
//       scale: 1.1
//     },
//     {
//       clipPath: maskEnd,
//       scale: 1,
//       duration: duration,
//       ease: ease,
//       scrollTrigger: {
//         trigger: trigger,
//         start: start,
//         end: "bottom 20%",
//         toggleActions: "play none none reverse",
//       }
//     }
//   );
// };

// // Main animation initialization function
// export const initAboutAnimations = (refs) => {
//   const ctx = gsap.context(() => {
    
//     // Story Section - Dramatic text reveals
//     if (refs.storyRef?.current) {
//       const h1 = refs.storyRef.current.querySelector('h1');
//       const h3 = refs.storyRef.current.querySelector('h3');
//       const paragraphs = refs.storyRef.current.querySelectorAll('p');
      
//       if (h1) {
//         createTextRevealAnimation(h1, {
//           duration: 1.5,
//           stagger: 0.08,
//           delay: 0.2
//         });
//       }
      
//       if (h3) {
//         createTextRevealAnimation(h3, {
//           duration: 1.2,
//           stagger: 0.06,
//           delay: 0.5
//         });
//       }
      
//       paragraphs.forEach((p, index) => {
//         createClipPathReveal(p, {
//           delay: 0.8 + (index * 0.2)
//         });
//       });
//     }

//     // Journey Section
//     if (refs.journeyRef?.current) {
//       const h3 = refs.journeyRef.current.querySelector('h3');
//       const paragraphs = refs.journeyRef.current.querySelectorAll('p');
      
//       if (h3) {
//         createTextRevealAnimation(h3, {
//           duration: 1.3,
//           stagger: 0.06
//         });
//       }
      
//       paragraphs.forEach((p, index) => {
//         createClipPathReveal(p, {
//           delay: 0.3 + (index * 0.2)
//         });
//       });
//     }

//     // Future Section
//     if (refs.futureRef?.current) {
//       const h3 = refs.futureRef.current.querySelector('h3');
//       const paragraphs = refs.futureRef.current.querySelectorAll('p');
      
//       if (h3) {
//         createTextRevealAnimation(h3, {
//           duration: 1.3,
//           stagger: 0.06
//         });
//       }
      
//       paragraphs.forEach((p, index) => {
//         createClipPathReveal(p, {
//           delay: 0.3 + (index * 0.2)
//         });
//       });
//     }

//     // Achievements - Sophisticated reveal
//     if (refs.achievementsRef?.current) {
//       const achievements = refs.achievementsRef.current.children;
      
//       gsap.fromTo(achievements,
//         {
//           opacity: 0,
//           y: 60,
//           scale: 0.8,
//           rotationX: -45
//         },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           rotationX: 0,
//           duration: 1.2,
//           stagger: 0.15,
//           ease: "back.out(1.4)",
//           scrollTrigger: {
//             trigger: refs.achievementsRef.current,
//             start: "top 85%",
//             end: "bottom 20%",
//             toggleActions: "play none none reverse"
//           }
//         }
//       );
//     }

//     // Team Section
//     if (refs.teamRef?.current) {
//       const h2 = refs.teamRef.current.querySelector('h2');
//       const description = refs.teamRef.current.querySelector('.team-description');
      
//       if (h2) {
//         createTextRevealAnimation(h2, {
//           duration: 1.4,
//           stagger: 0.08
//         });
//       }
      
//       if (description) {
//         createClipPathReveal(description, {
//           delay: 0.5
//         });
//       }

//       // Team Grid with mask reveals
//       const gridItems = refs.teamRef.current.querySelectorAll('.grid-item');
//       gridItems.forEach((item, index) => {
//         createMaskReveal(item, {
//           trigger: refs.teamRef.current.querySelector('.team-grid'),
//           start: "top 85%",
//           duration: 1.2,
//           direction: index % 2 === 0 ? 'up' : 'down',
//           delay: index * 0.1
//         });
//       });
//     }

//     // Dream Squad Section
//     if (refs.dreamRef?.current) {
//       const h1 = refs.dreamRef.current.querySelector('h1');
//       const paragraph = refs.dreamRef.current.querySelector('p');
      
//       if (h1) {
//         createTextRevealAnimation(h1, {
//           duration: 1.6,
//           stagger: 0.08
//         });
//       }
      
//       if (paragraph) {
//         createClipPathReveal(paragraph, {
//           delay: 0.6
//         });
//       }
//     }

//     // Directors Section
//     if (refs.directorRef?.current) {
//       const heading = refs.directorRef.current.querySelector('.director-head');
//       const directors = refs.directorRef.current.querySelectorAll('.ronak, .omkar, .hemant');
      
//       if (heading) {
//         createTextRevealAnimation(heading, {
//           duration: 1.3,
//           stagger: 0.07
//         });
//       }
      
//       directors.forEach((director, index) => {
//         const img = director.querySelector('img');
//         const text = director.querySelector('.director-designation');
        
//         if (img) {
//           createMaskReveal(img, {
//             trigger: refs.directorRef.current.querySelector('.director-imgs'),
//             start: "top 80%",
//             duration: 1.5,
//             direction: 'up',
//             delay: index * 0.2
//           });
//         }
        
//         if (text) {
//           gsap.fromTo(text,
//             {
//               opacity: 0,
//               y: 30
//             },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 1,
//               delay: 0.5 + (index * 0.2),
//               ease: "power3.out",
//               scrollTrigger: {
//                 trigger: refs.directorRef.current.querySelector('.director-imgs'),
//                 start: "top 80%",
//                 toggleActions: "play none none reverse"
//               }
//             }
//           );
//         }
//       });
//     }

//     // Images and placeholders with sophisticated reveals
//     const images = document.querySelectorAll('.story-image, .item, .future-item');
//     images.forEach((img, index) => {
//       createMaskReveal(img, {
//         trigger: img.closest('section') || img.closest('div'),
//         start: "top 75%",
//         duration: 1.8,
//         direction: index % 2 === 0 ? 'left' : 'right',
//         delay: index * 0.1
//       });
//     });

//   });

//   return ctx;
// };

// // Individual animation functions for granular control
// export const animateTextReveal = (element, options = {}) => {
//   createTextRevealAnimation(element, options);
// };

// export const animateClipPath = (element, options = {}) => {
//   createClipPathReveal(element, options);
// };

// export const animateMask = (element, options = {}) => {
//   createMaskReveal(element, options);
// };

// // Cleanup function
// export const cleanupAnimations = () => {
//   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//   gsap.globalTimeline.clear();
// };

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

// Initialize animations
export const initAboutAnimations = (refs) => {
  const ctx = gsap.context(() => {

    // Story Section
    if (refs.storyRef?.current) {
      const h1 = refs.storyRef.current.querySelector('h1');
      const h3 = refs.storyRef.current.querySelector('h3');
      const paragraphs = refs.storyRef.current.querySelectorAll('p');

      if (h1) {
        createBasicTextReveal(h1, { duration: 1.2, delay: 0.2 });
      }

      if (h3) {
        createBasicTextReveal(h3, { duration: 1.2, delay: 0.4 });
      }

      paragraphs.forEach((p, index) => {
        createClipPathReveal(p, {
          delay: 0.6 + index * 0.2
        });
      });
    }

    // Journey Section
    if (refs.journeyRef?.current) {
      const h3 = refs.journeyRef.current.querySelector('h3');
      const paragraphs = refs.journeyRef.current.querySelectorAll('p');

      if (h3) {
        createBasicTextReveal(h3, { duration: 1.2 });
      }

      paragraphs.forEach((p, index) => {
        createClipPathReveal(p, {
          delay: 0.3 + index * 0.2
        });
      });
    }

    // Future Section
    if (refs.futureRef?.current) {
      const h3 = refs.futureRef.current.querySelector('h3');
      const paragraphs = refs.futureRef.current.querySelectorAll('p');

      if (h3) {
        createBasicTextReveal(h3, { duration: 1.2 });
      }

      paragraphs.forEach((p, index) => {
        createClipPathReveal(p, {
          delay: 0.3 + index * 0.2
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