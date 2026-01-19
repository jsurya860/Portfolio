import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-50 group p-3 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 hover:border-green-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/20"
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6">
                {/* Sun Icon for Light Mode */}
                <Sun
                    className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${theme === 'light'
                            ? 'rotate-0 scale-100 opacity-100 text-amber-500'
                            : 'rotate-90 scale-0 opacity-0 text-gray-400'
                        }`}
                />

                {/* Moon Icon for Dark Mode */}
                <Moon
                    className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${theme === 'dark'
                            ? 'rotate-0 scale-100 opacity-100 text-blue-300'
                            : '-rotate-90 scale-0 opacity-0 text-gray-400'
                        }`}
                />
            </div>

            {/* Tooltip */}
            <span className="absolute -bottom-10 right-0 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
        </button>
    );
};

export default ThemeToggle;
