import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function SystemIntro() {
  const [isActive, setIsActive] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const bg          = isDark ? '#0F172A' : '#F8FAFC';
  const badgeBg     = isDark ? 'rgba(76,175,122,0.12)' : '#DCEFE4';
  const badgeBorder = isDark ? 'rgba(76,175,122,0.30)' : '#CFE5D8';
  const textPrimary = isDark ? '#F1F5F9' : '#1F2937';
  const textSub     = isDark ? '#9CA3AF' : '#4B5563';
  const trackBg     = isDark ? '#1E293B' : '#E5E7EB';

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ backgroundColor: bg }}
          aria-hidden="true"
        >
          {/* Initials badge */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: badgeBg, border: `1px solid ${badgeBorder}` }}
          >
            <span className="text-2xl font-black" style={{ color: '#4CAF7A' }}>SJ</span>
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="text-base font-semibold mb-1"
            style={{ color: textPrimary }}
          >
            Surya Joshi
          </motion.p>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.32 }}
            className="text-sm mb-8"
            style={{ color: textSub }}
          >
            QA Engineer
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-40 h-0.5 rounded-full overflow-hidden"
            style={{ background: trackBg }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.45 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #4CAF7A, #22C55E)' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

