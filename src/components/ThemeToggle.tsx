import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center
        border-[#E2E8F0] bg-[#F8FAFC]/90 text-[#475569]
        dark:border-[rgba(255,255,255,0.12)] dark:bg-[rgba(15,23,42,0.85)] dark:text-[#9CA3AF]
        shadow-md dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)]
        hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[0_0_16px_var(--glow-green)]
        dark:hover:border-[rgba(34,197,94,0.5)] dark:hover:shadow-[0_0_16px_rgba(34,197,94,0.25)]
        transition-all duration-300 select-none"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
