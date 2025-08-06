import React, { useState, useEffect, useRef, useCallback } from 'react';
import './WorkTextScramble.css';

const TextScramble = ({ phrases = ['Techinfinity', 'Showcasing', 'Our Work'], interval = 800 }) => {
    const [displayText, setDisplayText] = useState('');
    const [counter, setCounter] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const frameRef = useRef();
    const queueRef = useRef([]);
    const frameCountRef = useRef(0);
    const resolveRef = useRef();
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    const randomChar = useCallback(() => {
        return chars[Math.floor(Math.random() * chars.length)];
    }, [chars]);

    const formatText = useCallback((text) => {
        if (text === 'Our Work') {
            return '<span class="our-text">Our&nbsp;</span> <span class="work-text-final">Work</span>';
        }
        return text;
    }, []);

    const update = useCallback(() => {
        let output = '';
        let complete = 0;

        for (let i = 0; i < queueRef.current.length; i++) {
            let { from, to, start, end, char } = queueRef.current[i];

            if (frameCountRef.current >= end) {
                complete++;
                output += to;
            } else if (frameCountRef.current >= start) {
                if (!char || Math.random() < 0.28) {
                    char = randomChar();
                    queueRef.current[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        setDisplayText(output);

        if (complete === queueRef.current.length) {
            // Apply special formatting after scrambling is complete
            const currentPhrase = phrases[counter] || '';
            if (currentPhrase === 'Our Work') {
                setTimeout(() => {
                    setDisplayText(formatText(currentPhrase));
                }, 100);
            }
            
            if (resolveRef.current) {
                resolveRef.current();
            }
        } else {
            frameRef.current = requestAnimationFrame(update);
            frameCountRef.current++;
        }
    }, [randomChar, counter, phrases, formatText]);

    const setText = useCallback((newText, oldText = '') => {
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => {
            resolveRef.current = resolve;
        });

        queueRef.current = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            queueRef.current.push({ from, to, start, end });
        }

        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }

        frameCountRef.current = 0;
        update();

        return promise;
    }, [update]);

    const next = useCallback(() => {
        const currentText = phrases[counter] || '';
        const previousText = displayText.replace(/<[^>]*>/g, '') || ''; // Strip HTML tags

        setText(currentText, previousText).then(() => {
            // Check if we've reached the last phrase
            if (counter === phrases.length - 1) {
                setIsComplete(true);
                return;
            }

            setTimeout(() => {
                setCounter((prev) => prev + 1);
            }, interval);
        });
    }, [counter, phrases, setText, interval, displayText]);

    useEffect(() => {
        if (!isComplete) {
            next();
        }

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [counter]);

    return (
        <div className="work-text-scramble-container">
            <div
                className="work-text"
                dangerouslySetInnerHTML={{ __html: displayText }}
            />
        </div>
    );
};

export default TextScramble;