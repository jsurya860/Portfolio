import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Bug } from 'lucide-react';
import { useMemo } from 'react';

const ICONS = [Bug];

interface FloatingIconProps {
    el: {
        id: number;
        Icon: typeof Bug;
        left: string;
        top: string;
        scale: number;
        rotate: number;
        parallaxFactor: number;
        opacity: number;
    };
    scrollYProgress: MotionValue<number>;
}

function FloatingIcon({ el, scrollYProgress }: FloatingIconProps) {
    const y = useTransform(scrollYProgress, [0, 1], [0, -el.parallaxFactor]);

    return (
        <motion.div
            key={el.id}
            style={{
                left: el.left,
                top: el.top,
                scale: el.scale,
                rotate: el.rotate,
                y,
                opacity: el.opacity
            }}
            animate={{
                rotate: el.rotate + 360,
                y: [0, -20, 0]
            }}
            transition={{
                rotate: { duration: 20 + Math.random() * 20, repeat: Infinity, ease: "linear" },
                y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute text-green-500/10"
        >
            <el.Icon size={40} />
        </motion.div>
    );
}

export default function FloatingElements() {
    const { scrollYProgress } = useScroll();

    const elements = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            Icon: ICONS[i % ICONS.length],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 400}%`, // Spread across the whole height
            scale: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360,
            parallaxFactor: Math.random() * 500 + 200,
            opacity: Math.random() * 0.05 + 0.02
        }));
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
            {elements.map((el) => (
                <FloatingIcon key={el.id} el={el} scrollYProgress={scrollYProgress} />
            ))}
        </div>
    );
}
