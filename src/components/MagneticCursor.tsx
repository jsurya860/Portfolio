import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MagneticCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isPointer, setIsPointer] = useState(false);
    const [magneticElement, setMagneticElement] = useState<HTMLElement | null>(null);

    // Smooth springs for cursor movement
    const springConfig = { damping: 25, stiffness: 250 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('button, a, .magnetic-target');
            setIsPointer(!!isClickable);

            if (isClickable) {
                setMagneticElement(isClickable as HTMLElement);
            } else {
                setMagneticElement(null);
            }

            // If we're hovering a magnetic element, we center the cursor on it partially
            if (magneticElement) {
                const rect = magneticElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Blend mouse pos and element center (30% pull)
                mouseX.set(e.clientX + (centerX - e.clientX) * 0.3);
                mouseY.set(e.clientY + (centerY - e.clientY) * 0.3);
            } else {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [magneticElement, mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Outer Ring */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isPointer ? 60 : 24,
                    height: isPointer ? 60 : 24,
                    backgroundColor: isPointer ? 'rgba(74, 222, 128, 0.1)' : 'transparent',
                    borderColor: isPointer ? 'rgba(74, 222, 128, 0.5)' : 'rgba(255, 255, 255, 0.3)',
                }}
                className="absolute border rounded-full backdrop-blur-[1px] transition-colors duration-300"
            />

            {/* Inner Dot */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                className="absolute w-1 h-1 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)]"
            />

            {/* Dynamic Cursor Info (QA Style) */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                className="absolute ml-8 mt-8 font-mono text-[8px] text-green-500/40"
            >
                {isPointer ? 'TARGET_LOCKED' : 'SYSTEM_IDLE'}
            </motion.div>
        </div>
    );
}
