// script.js - Complete fixed version
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ===== FIRST SECTION: INFINITY SHAPE ANIMATION =====
const imgSrcs = [
    'https://picsum.photos/id/1011/60/70',
    'https://picsum.photos/id/1015/60/70',
    'https://picsum.photos/id/1016/60/70',
    'https://picsum.photos/id/1018/60/70',
    'https://picsum.photos/id/1020/60/70',
    'https://picsum.photos/id/1024/60/70',
    'https://picsum.photos/id/1027/60/70',
    'https://picsum.photos/id/1031/60/70',
    'https://picsum.photos/id/1033/60/70',
    'https://picsum.photos/id/1035/60/70',
    'https://picsum.photos/id/1036/60/70',
    'https://picsum.photos/id/1038/60/70',
    'https://picsum.photos/id/1040/60/70',
    'https://picsum.photos/id/1043/60/70',
    'https://picsum.photos/id/1044/60/70',
    'https://picsum.photos/id/1049/60/70',
    'https://picsum.photos/id/1050/60/70',
    'https://picsum.photos/id/1053/60/70',
    'https://picsum.photos/id/1057/60/70',
    'https://picsum.photos/id/1060/60/70',
    'https://picsum.photos/id/1062/60/70',
    'https://picsum.photos/id/1063/60/70',
    // 'https://picsum.photos/id/1067/60/70',
    // 'https://picsum.photos/id/1068/60/70',
    // 'https://picsum.photos/id/1071/60/70',
    // 'https://picsum.photos/id/1073/60/70',
    // 'https://picsum.photos/id/1074/60/70',
    // 'https://picsum.photos/id/1080/60/70',
    'https://picsum.photos/id/1084/60/70',
    'https://picsum.photos/id/1081/60/70',
];

const imgLinks = [
    'https://example.com/portfolio/project-1',
    'https://example.com/portfolio/project-2',
    'https://example.com/portfolio/project-3',
    'https://example.com/services/web-development',
    'https://example.com/portfolio/project-4',
    'https://example.com/services/digital-marketing',
    'https://example.com/portfolio/project-5',
    'https://example.com/services/seo',
    'https://example.com/portfolio/project-6',
    'https://example.com/services/social-media',
    'https://example.com/portfolio/project-7',
    'https://example.com/services/animation',
    'https://example.com/portfolio/project-8',
    'https://example.com/case-studies/success-story-1',
    'https://example.com/portfolio/project-9',
    'https://example.com/case-studies/success-story-2',
    'https://example.com/portfolio/project-10',
    'https://example.com/blog/marketing-trends',
    'https://example.com/portfolio/project-11',
    'https://example.com/about-us',
    'https://example.com/portfolio/project-12',
    'https://example.com/contact',
    'https://example.com/portfolio/project-13',
    // 'https://example.com/blog/web-design-tips',
    // 'https://example.com/portfolio/project-14',
    // 'https://example.com/services/branding',
    // 'https://example.com/portfolio/project-15',
    // 'https://example.com/testimonials',
    'https://example.com/portfolio/project-16',
    'https://example.com/get-quote',
];

let originalPositions = [];
let animationComplete = false;
let infinityShiftComplete = false;

// Main initialization function for infinity animation
export function initInfinityAnimation() {
    if (typeof window === 'undefined') return;
    
    setTimeout(() => {
        const container = document.getElementById('container');
        const infinityContainer = document.getElementById('infinity-container');
        const topText = document.getElementById('top-text');
        
        if (!container || !infinityContainer || !topText) {
            console.warn('Required elements not found for infinity animation');
            return;
        }

        infinityContainer.innerHTML = '';
        
        imgSrcs.forEach((src, index) => {
            const link = document.createElement('a');
            link.href = imgLinks[index] || '#';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.classList.add('img-link');

            const img = document.createElement('img');
            img.src = src;
            img.classList.add('img-item');
            img.style.top = `${Math.random() * 80 + 5}vh`;
            img.style.left = `${Math.random() * 90 + 2}vw`;

            link.addEventListener('click', (e) => {
                if (img.classList.contains('flip-active') || img.dataset.transitioning === 'true' || !animationComplete) {
                    e.preventDefault();
                    return false;
                }
            });

            link.appendChild(img);
            infinityContainer.appendChild(link);
        });

        initializeSectionPinning();
        fadeInImages();
        
        const header = document.querySelector('.header');
        if (header) {
            header.classList.add('hidden');
        }
    }, 100);
}

function initializeSectionPinning() {
    ScrollTrigger.create({
        trigger: "#section-one",
        start: "top top",
        end: () => animationComplete && infinityShiftComplete ? "+=0" : "+=10000",
        pin: true,
        pinSpacing: false,
        onUpdate: self => {
            if (animationComplete && infinityShiftComplete && self.progress > 0) {
                const scrollIndicator = document.querySelector('.scroll-indicator');
                if (scrollIndicator) {
                    scrollIndicator.classList.remove('show');
                }
                self.kill();
                enableScrollTransition();
            }
        }
    });
}

export function reenableScrollIndicatorOnScrollUp() {
    ScrollTrigger.create({
        trigger: "#section-one",
        start: "top top",
        end: "bottom top",
        onEnter: () => {
            if (animationComplete) {
                const scrollIndicator = document.querySelector('.scroll-indicator');
                if (scrollIndicator) {
                    scrollIndicator.classList.add("show");
                }
            }
        },
        onLeaveBack: () => {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.classList.remove("show");
            }
        }
    });
}

export function fadeInImages(index = 0) {
    const images = document.querySelectorAll('.img-item');
    if (index >= images.length) {
        setTimeout(alignImagesInRow, 1000);
        return;
    }
    images[index].style.opacity = '1';
    setTimeout(() => fadeInImages(index + 1), 100);
}

export function alignImagesInRow() {
    const images = document.querySelectorAll('.img-item');
    const infinityContainer = document.getElementById('infinity-container');
    
    if (!infinityContainer || !images.length) return;
    
    const containerWidth = infinityContainer.clientWidth;
    const margin = 20;
    const totalWidth = images.length * (60 + margin) - margin;
    let startX = (containerWidth - totalWidth) / 2;

    images.forEach((img, idx) => {
        img.style.top = `${infinityContainer.offsetHeight / 2 + 40}px`;
        img.style.left = `${startX + idx * (60 + margin)}px`;
        img.style.transform = 'translate(0, 0)';
    });

    setTimeout(formInfinityShape, 2000);
}

export function formInfinityShape() {
    const container = document.getElementById('container');
    const infinityContainer = document.getElementById('infinity-container');
    const images = document.querySelectorAll('.img-item');
    
    if (!container || !infinityContainer || !images.length) return;
    
    container.classList.add('slow-transition');

    const containerWidth = infinityContainer.clientWidth;
    const containerHeight = infinityContainer.clientHeight;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    const baseSize = Math.min(centerX, centerY) / 2.5;
    const a = baseSize * 6.5;

    let flowImages = [];
    let staticImages = [];

    images.forEach((img, idx) => {
        const t = (idx / images.length) * 2 * Math.PI;
        const denom = 1 + Math.pow(Math.cos(t), 2);
        const x = a * Math.sin(t) / denom;
        const y = a * Math.sin(t) * Math.cos(t) / denom;

        const posX = centerX + x;
        const posY = centerY + y;

        const isInFlowSection = x > 50 && y < 0;

        if (isInFlowSection) {
            flowImages.push({ img, idx, x, y, posX, posY, t });
        } else {
            staticImages.push({ img, idx, x, y, posX, posY });
        }

        img.style.left = `${posX}px`;
        img.style.top = `${posY}px`;
        img.style.setProperty('--repel-x', '0px');
        img.style.setProperty('--repel-y', '0px');
        img.style.transform = `translate(var(--repel-x), var(--repel-y)) translate(-50%, -50%) rotateY(0deg)`;

        originalPositions[idx] = { x: posX, y: posY };
    });

    window.flowImages = flowImages;
    window.staticImages = staticImages;

    setTimeout(() => {
        container.classList.remove('slow-transition');
        container.classList.add('infinity-formed');
        enableRepelAndFlipProximity();

        const sectionOne = document.getElementById('section-one');
        if (sectionOne) {
            sectionOne.style.background = 'transparent';
        }

        setTimeout(() => {
            shiftInfinityShapeDown();
        }, 1000);

        setTimeout(() => {
            const topText = document.getElementById('top-text');
            if (topText) {
                animateSplitText(topText);
                topText.style.opacity = '1';
            }
        }, 2000);

        setTimeout(() => {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.classList.add('show');
            }

            setTimeout(() => {
                animationComplete = true;
                const header = document.querySelector('.header');
                if (header) {
                    header.classList.remove('hidden');
                }
            }, 1000);
        }, 4000);
    }, 4000);
}

export function shiftInfinityShapeDown() {
    const infinityContainer = document.getElementById('infinity-container');
    const images = document.querySelectorAll('.img-item');
    
    if (!infinityContainer || !images.length) return;
    
    const shiftDistance = window.innerHeight * 0.1;

    const shiftTimeline = gsap.timeline({
        ease: "power2.inOut",
        onStart: () => {
            infinityContainer.style.pointerEvents = 'none';
        },
        onComplete: () => {
            infinityShiftComplete = true;
            infinityContainer.style.pointerEvents = 'auto';

            images.forEach((img, idx) => {
                const rect = img.getBoundingClientRect();
                const containerRect = infinityContainer.getBoundingClientRect();
                originalPositions[idx] = {
                    x: rect.left + rect.width / 2 - containerRect.left,
                    y: rect.top + rect.height / 2 - containerRect.top
                };
            });
        }
    });

    shiftTimeline.to(infinityContainer, {
        y: shiftDistance,
        duration: 2.0,
        ease: "power2.inOut"
    }, 0);

    shiftTimeline.to(infinityContainer, {
        scale: 0.92,
        duration: 1.0,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
    }, 0.3);

    shiftTimeline.to(images, {
        opacity: 0.7,
        duration: 0.6,
        ease: "power1.inOut",
        stagger: 0.03
    }, 0.2)
    .to(images, {
        opacity: 1,
        duration: 1.0,
        ease: "power1.inOut",
        stagger: 0.02
    }, 1.0);
}

export function animateSplitText(textElement) {
    const firstLine = ['Best', 'Digital', 'Creative'];
    const secondLine = ['Marketing', 'Agency'];

    textElement.textContent = '';
    const allWords = [];

    const firstLineDiv = document.createElement('div');
    firstLineDiv.className = 'text-line';

    firstLine.forEach((word) => {
        const spanWrapper = document.createElement('span');
        spanWrapper.className = word === 'Creative' ? 'italic word-span' : 'normal word-span';
        spanWrapper.textContent = word;
        firstLineDiv.appendChild(spanWrapper);
        allWords.push(spanWrapper);
    });

    textElement.appendChild(firstLineDiv);

    const secondLineDiv = document.createElement('div');
    secondLineDiv.className = 'text-line';

    secondLine.forEach((word) => {
        const spanWrapper = document.createElement('span');
        spanWrapper.className = 'normal word-span';
        spanWrapper.textContent = word;
        secondLineDiv.appendChild(spanWrapper);
        allWords.push(spanWrapper);
    });

    textElement.appendChild(secondLineDiv);

    gsap.fromTo(allWords,
        {
            y: 100,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            stagger: 0.2,
            delay: 0.3
        }
    );
}

export function enableRepelAndFlipProximity() {
    const infinityContainer = document.getElementById('infinity-container');
    const images = document.querySelectorAll('.img-item');
    
    if (!infinityContainer || !images.length) return;
    
    const maxRepelDistance = 100;
    const maxRepelAmount = 35;

    const mouseMoveHandler = (e) => {
        const rect = infinityContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        images.forEach((img, idx) => {
            if (img.dataset.transitioning === 'true') return;

            const orig = originalPositions[idx];
            if (!orig) return;
            
            const dx = orig.x - mouseX;
            const dy = orig.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxRepelDistance) {
                const repelFactor = (maxRepelDistance - dist) / maxRepelDistance;
                const offsetX = (dx / dist) * repelFactor * maxRepelAmount;
                const offsetY = (dy / dist) * repelFactor * maxRepelAmount;

                img.style.setProperty('--repel-x', `${offsetX}px`);
                img.style.setProperty('--repel-y', `${offsetY}px`);
                img.classList.add('flip-active');
            } else {
                img.style.setProperty('--repel-x', '0px');
                img.style.setProperty('--repel-y', '0px');
                img.classList.remove('flip-active');
            }
        });
    };

    const mouseLeaveHandler = () => {
        images.forEach(img => {
            if (img.dataset.transitioning === 'true') return;
            img.style.setProperty('--repel-x', '0px');
            img.style.setProperty('--repel-y', '0px');
            img.classList.remove('flip-active');
        });
    };

    infinityContainer.addEventListener('mousemove', mouseMoveHandler);
    infinityContainer.addEventListener('mouseleave', mouseLeaveHandler);
}

export function enableScrollTransition() {
    if (!window.flowImages || !window.staticImages) return;

    const sectionTwo = document.querySelector('#section-two');
    if (sectionTwo) {
        sectionTwo.classList.add('visible');
    }

    const transitionTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#section-one',
            start: 'bottom 85%',
            end: 'bottom 15%',
            scrub: 2,
            onStart: () => {
                window.flowImages.forEach(({ img }) => {
                    img.dataset.transitioning = 'true';
                    img.style.zIndex = '200';
                });
            },
            onComplete: () => {
                const images = document.querySelectorAll('.img-item');
                images.forEach(img => {
                    img.style.opacity = '0';
                });
            }
        }
    });

    let sortedFlowImages = window.flowImages.sort((a, b) => a.x - b.x);
    const topLeftImages = sortedFlowImages.filter(({ x, y }) => x < -50 && y < 0);
    const otherFlowImages = sortedFlowImages.filter(({ x, y }) => !(x < -50 && y < 0));
    const limitedTopLeft = topLeftImages.slice(0, 2);
    sortedFlowImages = [...limitedTopLeft, ...otherFlowImages].sort((a, b) => a.x - b.x);

    sortedFlowImages.forEach(({ img }, index) => {
        const targetX = window.innerWidth / 2;
        const targetY = window.innerHeight * 1.5;
        const currentRect = img.getBoundingClientRect();
        const moveX = targetX - (currentRect.left + currentRect.width / 2);
        const moveY = targetY - (currentRect.top + currentRect.height / 2);
        const staggerDelay = index * 0.2;

        transitionTl
            .to(img, {
                x: moveX * 0.3,
                y: moveY * 0.3,
                scale: 1.2,
                opacity: 0.9,
                rotation: 5,
                duration: 0.3,
                ease: 'power1.out',
            }, staggerDelay)
            .to(img, {
                x: moveX * 0.7,
                y: moveY * 0.7,
                scale: 2,
                opacity: 0.7,
                rotation: 15,
                filter: 'blur(1px)',
                duration: 0.4,
                ease: 'power1.inOut'
            }, staggerDelay + 0.3)
            .to(img, {
                x: moveX,
                y: moveY,
                scale: 3.5,
                opacity: 0.4,
                rotation: 25,
                filter: 'blur(3px)',
                duration: 0.3,
                ease: 'power2.in'
            }, staggerDelay + 0.7)
            .to(img, {
                scale: 5,
                opacity: 0,
                rotation: 35,
                filter: 'blur(8px)',
                duration: 0.2,
                ease: 'power2.in'
            }, staggerDelay + 1.0);
    });

    gsap.to(window.staticImages.map(({ img }) => img), {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(2px)',
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: '#section-one',
            start: 'bottom 80%',
            end: 'bottom 40%',
            scrub: 2
        }
    });

    initializeSecondSection();
}

// ===== SECOND SECTION: ENHANCED 3D ZOOM SCROLL ANIMATION =====
export function initializeSecondSection() {
    const sectionTwo = document.querySelector('#section-two');
    if (!sectionTwo) return;

    const imgs = gsap.utils.toArray('.dm-zoom-reveal-img-2');
    const text = document.querySelector('.center-text');
    const video = document.querySelector('.center-video');
    const videoOverlay = document.querySelector('.video-overlay');

    if (!imgs.length) return;

    const targetPositions = [
        { x: -300, y: -200 },
        { x: 300, y: -220 },
        { x: -350, y: 100 },
        { x: 350, y: 140 },
        { x: -200, y: 300 },
        { x: 200, y: 320 },
        { x: 0, y: -350 },
        { x: 0, y: 350 },
        { x: 0, y: 0 }
    ];

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionTwo,
            start: "top top",
            end: "+=300vh",
            scrub: 2.5,
            pin: ".dm-zoom-reveal-wrapper-2",
            anticipatePin: 1,
        }
    });

    if (text) {
        tl.to(text, {
            opacity: 1,
            duration: 1.5,
            ease: "power1.inOut",
        }, 0);
    }

    imgs.forEach((img, i) => {
        tl.to(img, {
            duration: 2.5,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "sine.inOut",
            zIndex: 10 + i,
            x: targetPositions[i]?.x || 0,
            y: targetPositions[i]?.y || 0,
        }, 0.5 + i * 0.4);
    });

    imgs.forEach((img, i) => {
        const pos = targetPositions[i] || { x: 0, y: 0 };
        const factor = 3.5;

        tl.to(img, {
            duration: 1,
            x: pos.x * factor,
            y: pos.y * factor,
            scale: 1.15 + i * 0.1,
            ease: "power4.in",
            opacity: 1,
            filter: "blur(0px)",
            zIndex: 0,
        }, 2 + i * 0.5);

        tl.to(img, {
            duration: 0.6,
            opacity: 0,
            ease: "power1.out",
        }, 3 + i * 0.5);
    });

    if (text) {
        tl.to(text, {
            opacity: 0,
            duration: 0.8,
            ease: "power1.out",
        }, 4.5);
    }

    if (video) {
        tl.to(video, {
            opacity: 1,
            scale: 0.5,
            filter: "blur(10px)",
            duration: 0.8,
            ease: "power2.out",
        }, 5.0);

        tl.to(video, {
            scale: 1.5,
            filter: "blur(5px)",
            duration: 1.0,
            ease: "power2.inOut",
        }, 5.8);

        tl.to(video, {
            scale: 1.5,
            filter: "blur(2px)",
            width: "100%",
            height: "100%",
            duration: 1.5,
            ease: "power2.in",
        }, 6.8);
    }

    if (videoOverlay) {
        tl.to(videoOverlay, {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            onComplete: () => {
                initMagneticPlayButton();
            }
        }, 7.5);
    }

    if (video) {
        tl.to(video, {
            scale: 1.6,
            filter: "blur(5px)",
            duration: 0.7,
            ease: "power2.inOut",
        }, 8.3);
    }
}

// Add this to your script.js file - Modified initMagneticPlayButton function

function initMagneticPlayButton() {
    const videoOverlay = document.getElementById('videoOverlay');
    const playButton = document.getElementById('playButton');
    
    if (!videoOverlay || !playButton) {
        console.warn('Video overlay or play button not found!');
        return;
    }

    const magneticStrength = 0.4;
    const magneticRadius = 200;
    let isHovering = false;

    function updateMagneticEffect(e) {
        const rect = videoOverlay.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < magneticRadius) {
            const strength = (magneticRadius - distance) / magneticRadius;
            const moveX = deltaX * strength * magneticStrength;
            const moveY = deltaY * strength * magneticStrength;
            
            gsap.to(playButton, {
                x: moveX,
                y: moveY,
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (!isHovering) {
                isHovering = true;
                gsap.to(playButton, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(playButton, {
                    boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        } else {
            if (isHovering) {
                resetButton();
            }
        }
    }

    function resetButton() {
        isHovering = false;
        gsap.to(playButton, {
            x: 0,
            y: 0,
            scale: 1,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            duration: 0.5,
            ease: "power2.out"
        });
    }

    function createLightboxModal() {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'video-lightbox-modal';
        modal.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close video">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
                <div class="lightbox-video-container">
                    <iframe
                        src="https://www.youtube.com/embed/n9yh-saRjbg?autoplay=1&rel=0&modestbranding=1"
                        title="Showreel Video"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        `;

        // Add modal styles
        const styles = `
            .video-lightbox-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }

            .video-lightbox-modal.active {
                opacity: 1;
                visibility: visible;
            }

            .lightbox-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                cursor: pointer;
            }

            .lightbox-content {
                position: relative;
                width: 90%;
                max-width: 1200px;
                aspect-ratio: 16/9;
                background: #000;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }

            .video-lightbox-modal.active .lightbox-content {
                transform: scale(1);
            }

            .lightbox-close {
                position: absolute;
                top: -50px;
                right: 0;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
                z-index: 10001;
            }

            .lightbox-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }

            .lightbox-video-container {
                width: 100%;
                height: 100%;
                position: relative;
            }

            .lightbox-video-container iframe {
                width: 100%;
                height: 100%;
                border: none;
            }

            @media (max-width: 768px) {
                .lightbox-content {
                    width: 95%;
                    margin: 20px;
                }
                
                .lightbox-close {
                    top: -60px;
                    right: 10px;
                }
            }
        `;

        // Add styles to head if not already added
        if (!document.querySelector('#lightbox-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'lightbox-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        return modal;
    }

    function handlePlayButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Remove magnetic effect listeners
        videoOverlay.removeEventListener('mousemove', updateMagneticEffect);
        videoOverlay.removeEventListener('mouseleave', resetButton);
        
        // Button click animation
        gsap.to(playButton, {
            scale: 0.9,
            duration: 0.1,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(playButton, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });
        
        // Create and show lightbox modal
        const modal = createLightboxModal();
        document.body.appendChild(modal);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Close modal function
        function closeLightbox() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            setTimeout(() => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            }, 300);
        }
        
        // Add event listeners for closing
        const closeBtn = modal.querySelector('.lightbox-close');
        const backdrop = modal.querySelector('.lightbox-backdrop');
        
        closeBtn.addEventListener('click', closeLightbox);
        backdrop.addEventListener('click', closeLightbox);
        
        // Close on Escape key
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', handleKeyDown);
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        
        // Remove the original video overlay fade out
        // Keep the video overlay visible for future use
    }

    setTimeout(() => {
        videoOverlay.style.opacity = '1';
        videoOverlay.style.pointerEvents = 'auto';
        
        videoOverlay.addEventListener('mousemove', updateMagneticEffect);
        videoOverlay.addEventListener('mouseleave', resetButton);
        playButton.addEventListener('click', handlePlayButtonClick);
        
        gsap.fromTo(playButton, 
            { 
                scale: 0, 
                opacity: 0 
            },
            { 
                scale: 1, 
                opacity: 1, 
                duration: 0.6, 
                ease: "back.out(1.7)" 
            }
        );
        
    }, 500);
}

// Service provider section
export function initializeServiceProvider() {
    const serviceItems = document.querySelectorAll(".service-item");
    const serviceImages = document.querySelectorAll(".service-image");

    if (!serviceItems.length || !serviceImages.length) return;

    for (let i = 0; i < Math.min(serviceItems.length, serviceImages.length); i++) {
        const animation = gsap.to(serviceImages[i], {
            opacity: 1,
            duration: 0.2,
            scale: 1,
            ease: "ease-in-out"
        });

        serviceItems[i].addEventListener("mouseenter", () => animation.play());
        serviceItems[i].addEventListener("mouseleave", () => animation.reverse());
        animation.reverse();
    }

    function moveImage(e) {
        gsap.to([...serviceImages], {
            css: {
                left: e.pageX + 50,
                top: e.pageY,
            },
            duration: 0.3,
        });
    }

    serviceItems.forEach((el) => {
        el.addEventListener("mousemove", moveImage);
    });
}

export function moveImage(e) {
    const serviceImages = document.querySelectorAll(".service-image");
    gsap.to([...serviceImages], {
        css: {
            left: e.pageX + 50,
            top: e.pageY,
        },
        duration: 0.3,
    });
}

// Counters section
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

let counterObserver = null;

export function startCounters() {
    const counterItems = document.querySelectorAll('.counter-item');
    const counterNumbers = document.querySelectorAll('.counter-number');

    counterItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 150);
    });

    counterNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        const suffix = target === 100 ? '%' : '+';

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;

                if (target === 100) {
                    counter.textContent = Math.ceil(current) + '%';
                } else {
                    counter.textContent = Math.ceil(current) + '+';
                }

                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };

        setTimeout(updateCounter, 300);
    });
}

export function initializeCounters() {
    const counterSection = document.getElementById('counters');
    if (!counterSection) return;

    if (counterObserver) {
        counterObserver.disconnect();
    }

    counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counterObserver.observe(counterSection);
}

// Circle ring animation
export function initializeCircleRingAnimation() {
    const allCircles = gsap.utils.toArray('.circle-ring');
    const sectionTwo = document.querySelector('#section-two');

    if (!allCircles.length || !sectionTwo) return;

    ScrollTrigger.create({
        trigger: sectionTwo,
        start: "top 80%",
        onEnter: () => {
            allCircles.forEach((circle, index) => {
                gsap.to(circle, {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: index * 0.2
                });
            });
        }
    });

    ScrollTrigger.create({
        trigger: sectionTwo,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: self => {
            const progress = self.progress;
            allCircles.forEach((circle, index) => {
                const scaleAmount = 0.9 + Math.sin(progress * Math.PI * 3 + index) * 0.15;
                gsap.set(circle, {
                    scale: scaleAmount,
                    rotation: progress * 20 * (index + 1)
                });
            });
        }
    });
}

// SVG line animation
// export function initSVGAnimation() {
//     const svgSection = document.querySelector('.section-three');
//     const svgPaths = document.querySelectorAll('.svg-line path');
    
//     if (!svgSection || !svgPaths.length) return;
    
//     svgPaths.forEach(path => {
//         const pathLength = path.getTotalLength();
//         path.style.strokeDasharray = pathLength;
//         path.style.strokeDashoffset = pathLength;
//     });
    
//     function updateSVGAnimation() {
//         const sectionTop = svgSection.offsetTop;
//         const sectionHeight = svgSection.offsetHeight;
//         const scrollTop = window.pageYOffset;
//         const windowHeight = window.innerHeight;
        
//         const sectionStart = sectionTop - windowHeight;
//         const sectionEnd = sectionTop + sectionHeight;
        
//         let scrollProgress = 0;
        
//         if (scrollTop >= sectionStart && scrollTop <= sectionEnd) {
//             scrollProgress = (scrollTop - sectionStart) / (sectionEnd - sectionStart);
//             scrollProgress = Math.max(0, Math.min(1, scrollProgress));
//         }
        
//         svgPaths.forEach(path => {
//             const pathLength = path.getTotalLength();
//             const drawLength = pathLength * scrollProgress;
//             path.style.strokeDashoffset = pathLength - drawLength;
//         });
//     }
    
//     updateSVGAnimation();
    
//     const scrollHandler = () => updateSVGAnimation();
//     const resizeHandler = () => updateSVGAnimation();
    
//     window.addEventListener('scroll', scrollHandler);
//     window.addEventListener('resize', resizeHandler);
    
//     return () => {
//         window.removeEventListener('scroll', scrollHandler);
//         window.removeEventListener('resize', resizeHandler);
//     };
// }

export function initSectionThreeSVGAnimation() {
    const svgSection = document.querySelector('.section-three');
    const svgPaths = document.querySelectorAll('.section-three svg path, .section-three svg line');
    
    if (!svgSection || !svgPaths.length) return;
    
    // Group elements by layers and initialize stroke properties
    const elementsData = Array.from(svgPaths).map((path, index) => {
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
        
        // Initialize stroke properties
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        
        return {
            element: path,
            length: length,
            layer: layer,
            index: index
        };
    });
    
    // Create ScrollTrigger for Section Three SVG Animation
    ScrollTrigger.create({
        trigger: ".section-three",
        start: "top 80%", // Start when section-three is 80% in viewport
        end: "bottom 20%", // End when section-three is 20% in viewport
        scrub: 1, // Smooth scrubbing, tied to scroll position
        invalidateOnRefresh: true, // Recalculate on window resize
        onUpdate: (self) => {
            const progress = self.progress;
            
            elementsData.forEach(data => {
                // Each layer starts animating after the previous layer is complete
                const layerStartProgress = data.layer * 0.35; // Layer 0 starts at 0%, layer 1 at 25%, layer 2 at 50%
                const layerAnimationDuration = 0.3; // Each layer animates over 30% of scroll
                
                const layerEndProgress = layerStartProgress + layerAnimationDuration;
                
                let layerScrollFraction = 0;
                if (progress >= layerStartProgress && progress <= layerEndProgress) {
                    layerScrollFraction = (progress - layerStartProgress) / layerAnimationDuration;
                } else if (progress > layerEndProgress) {
                    layerScrollFraction = 1;
                }
                
                // Apply the animation
                if (data.element && data.element.style) {
                    data.element.style.strokeDashoffset = data.length * (1 - layerScrollFraction);
                }
            });
        },
        onLeave: () => {
            // Ensure all lines are fully drawn when leaving the section
            elementsData.forEach(data => {
                if (data.element && data.element.style) {
                    data.element.style.strokeDashoffset = 0;
                }
            });
        },
        onEnterBack: () => {
            // Reset animation when scrolling back into section from below
            elementsData.forEach(data => {
                if (data.element && data.element.style) {
                    data.element.style.strokeDashoffset = data.length;
                }
            });
        },
        onLeaveBack: () => {
            // Reset animation when scrolling back up past the section
            elementsData.forEach(data => {
                if (data.element && data.element.style) {
                    data.element.style.strokeDashoffset = data.length;
                }
            });
        }
    });
    
    // Return cleanup function
    return () => {
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger && trigger.trigger.closest('.section-three')) {
                trigger.kill();
            }
        });
    };
}


// Section-six infinity gallery

const imageData = [
    { src: 'https://picsum.photos/60/70?random=1', alt: 'Mountain landscape' },
    { src: 'https://picsum.photos/60/70?random=2', alt: 'Forest path' },
    { src: 'https://picsum.photos/60/70?random=3', alt: 'Ocean waves' },
    { src: 'https://picsum.photos/60/70?random=4', alt: 'City skyline' },
    { src: 'https://picsum.photos/60/70?random=5', alt: 'Desert landscape' },
    { src: 'https://picsum.photos/60/70?random=6', alt: 'Cherry blossoms' },
    { src: 'https://picsum.photos/60/70?random=7', alt: 'Northern lights' },
    { src: 'https://picsum.photos/60/70?random=8', alt: 'Lake reflection' },
    { src: 'https://picsum.photos/60/70?random=9', alt: 'Snowy mountains' },
    { src: 'https://picsum.photos/60/70?random=10', alt: 'Canyon vista' },
    { src: 'https://picsum.photos/60/70?random=11', alt: 'Sunset beach' },
    { src: 'https://picsum.photos/60/70?random=12', alt: 'Waterfall cascade' },
    { src: 'https://picsum.photos/60/70?random=13', alt: 'Tropical paradise' },
    { src: 'https://picsum.photos/60/70?random=14', alt: 'Mountain peak' },
    { src: 'https://picsum.photos/60/70?random=15', alt: 'River valley' },
    { src: 'https://picsum.photos/60/70?random=16', alt: 'Starry night' },
    { src: 'https://picsum.photos/60/70?random=17', alt: 'Golden hour' },
    { src: 'https://picsum.photos/60/70?random=18', alt: 'Rocky coastline' },
    { src: 'https://picsum.photos/60/70?random=19', alt: 'Alpine lake' },
    { src: 'https://picsum.photos/60/70?random=20', alt: 'Forest canopy' },
    { src: 'https://picsum.photos/60/70?random=21', alt: 'Ice formations' },
    { src: 'https://picsum.photos/60/70?random=22', alt: 'Volcanic landscape' },
    { src: 'https://picsum.photos/60/70?random=23', alt: 'Meadow flowers' },
    { src: 'https://picsum.photos/60/70?random=24', alt: 'Desert dunes' }
];

export function createInfinityGallery() {
    const infinityShape = document.getElementById('infinityShape');
    if (!infinityShape) return;
    
    infinityShape.innerHTML = '';
    
    imageData.forEach((imageInfo, index) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'infinity-image-item';
        
        const img = document.createElement('img');
        img.src = imageInfo.src;
        img.alt = imageInfo.alt;
        img.loading = 'lazy';
        
        imageItem.appendChild(img);
        infinityShape.appendChild(imageItem);
    });
}

export function initializeGSAPAnimation() {
    const imageItems = document.querySelectorAll('.infinity-image-item');
    const infinityShape = document.querySelector('.infinity-shape');
    
    if (!imageItems.length || !infinityShape) return;
    
    gsap.set(infinityShape, { opacity: 0 });
    gsap.set(imageItems, { opacity: 0, scale: 0, visibility: "hidden" });
    
    ScrollTrigger.create({
        trigger: ".section-six",
        start: "center bottom",
        end: "+150vh",
        scrub: 0.5,
        onEnter: () => {
            gsap.to(infinityShape, { opacity: 1, duration: 0.3 });
        },
        onUpdate: self => {
            const progress = self.progress;
            
            imageItems.forEach((item, index) => {
                const imageProgress = Math.max(0, Math.min(1, (progress * 50 - index * 0.8)));
                
                if (imageProgress > 0) {
                    gsap.set(item, { visibility: "visible" });
                    gsap.to(item, {
                        opacity: imageProgress,
                        scale: imageProgress,
                        duration: 0.15,
                        ease: "power3.out"
                    });
                } else {
                    gsap.set(item, { visibility: "hidden" });
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0,
                        duration: 0.15 
                    });
                }
            });
        }
    });
}

export function initializeParallax() {
    const sectionSix = document.querySelector(".section-six");
    if (!sectionSix) return;
    
    gsap.to(sectionSix, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: sectionSix,
            start: "top bottom",
            end: "+300vh",
            scrub: 0.5
        }
    });
}

// Form functionality
export function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        if (!data.name || !data.email || !data.requirements) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // alert('Thank you! Your message has been submitted successfully.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            document.getElementById('requirements').value = '';
        }, 1500);
    });

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// Go to top functionality
export function initializeGoToTop() {
    const goToTopBtn = document.getElementById('goToTopBtn');
    if (!goToTopBtn) return;

    let isScrolling = false;

    function handleScrollForGoToTop() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 300) {
                    goToTopBtn.classList.add('visible');
                } else {
                    goToTopBtn.classList.remove('visible');
                }
                
                isScrolling = false;
            });
            isScrolling = true;
        }
    }

    function smoothScrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', handleScrollForGoToTop);
    goToTopBtn.addEventListener('click', smoothScrollToTop);

    goToTopBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            smoothScrollToTop();
        }
    });
}

export function handleScroll() {
    // This is for backwards compatibility
    const goToTopBtn = document.getElementById('goToTopBtn');
    if (!goToTopBtn) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
        goToTopBtn.classList.add('visible');
    } else {
        goToTopBtn.classList.remove('visible');
    }
}

export function scrollToTop() {
    const scrollDuration = 800;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    
    function smoothScroll() {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
            requestAnimationFrame(smoothScroll);
        }
    }
    
    smoothScroll();
}

export function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// Initialize all animations when DOM is ready
export function initializeAllAnimations() {
    if (typeof window === 'undefined') return;
    
    // Initialize counters
    initializeCounters();
    
    // Initialize circle rings
    initializeCircleRingAnimation();
    
    // Initialize SVG animation
    const svgCleanup = initSectionThreeSVGAnimation();
    
    // Initialize service provider
    initializeServiceProvider();
    
    // Initialize section six gallery
    setTimeout(() => {
        createInfinityGallery();
        initializeGSAPAnimation();
        initializeParallax();
    }, 50);
    
    // Initialize form handling
    initializeFormHandling();
    
    // Initialize go to top
    initializeGoToTop();
    
    // Scroll indicator reinitialization
    reenableScrollIndicatorOnScrollUp();

    
    // Return cleanup function
    return () => {
        if (svgCleanup) svgCleanup();
        if (counterObserver) {
            counterObserver.disconnect();
        }
    };
}