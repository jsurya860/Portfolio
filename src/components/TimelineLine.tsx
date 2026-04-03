import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  className?: string;
  translateClass?: string;
}

export default function TimelineLine({ className = '', translateClass }: Props) {
  const translate = translateClass ?? 'md:-translate-x-1/2';

  return (
    <>
      <div className={`absolute left-4 sm:left-6 md:left-1/2 top-2 bottom-12 w-[1px] bg-[var(--border-color)] ${translate} z-20 ${className}`} />
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className={`absolute left-4 sm:left-6 md:left-1/2 top-2 bottom-12 w-[2px] bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-secondary)] to-transparent ${translate} origin-top shadow-[0_0_15px_var(--glow-green)] z-20 ${className}`}
      />
    </>
  );
}
