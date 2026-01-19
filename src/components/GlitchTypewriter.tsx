import { useState, useEffect } from 'react';

interface GlitchTypewriterProps {
    texts: string[];
    speed?: number;
    className?: string;
    delay?: number;
    waitTime?: number;
}

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\';

export default function GlitchTypewriter({
    texts,
    speed = 50,
    className = "",
    delay = 0,
    waitTime = 2000
}: GlitchTypewriterProps) {
    const [displayText, setDisplayText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        const currentFullText = texts[textIndex] || '';

        const handleAction = () => {
            if (isWaiting) {
                setIsWaiting(false);
                setIsDeleting(true);
                return;
            }

            if (!isDeleting) {
                if (displayText.length < currentFullText.length) {
                    // Typing: Add glitch occasionally
                    if (Math.random() > 0.9) {
                        const glitchChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                        setDisplayText(currentFullText.slice(0, displayText.length) + glitchChar);
                    } else {
                        setDisplayText(currentFullText.slice(0, displayText.length + 1));
                    }
                } else {
                    // Finished typing
                    setIsWaiting(true);
                }
            } else {
                if (displayText.length > 0) {
                    // Deleting
                    setDisplayText(displayText.slice(0, displayText.length - 1));
                } else {
                    // Finished deleting
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        };

        const time = isWaiting
            ? waitTime
            : (isDeleting ? speed / 2 : (displayText === '' ? delay : speed));

        const timeout = setTimeout(handleAction, time);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex, texts, speed, delay, waitTime, isWaiting]);

    return (
        <span className={`${className} font-mono relative inline-flex items-center`}>
            <span className="bg-inherit bg-clip-text text-transparent">{displayText}</span>
            <span className="w-[4px] h-[0.8em] bg-green-500 ml-1 animate-pulse shrink-0" />
        </span>
    );
}
