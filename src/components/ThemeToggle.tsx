import { motion } from "framer-motion";

interface ThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const ThemeToggle = ({ isDarkMode, setIsDarkMode }: ThemeToggleProps) => {
  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="fixed bottom-8 right-8 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-110"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
        <motion.path
          d="M13 10V3L4 14h7v7l9-11h-7z"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isDarkMode
              ? [0, 1, 0.3, 1, 0.5, 1]
              : [1, 0.5, 1, 0.3, 1, 0],
          }}
          transition={{
            duration: 0.5,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
        />
      </svg>
    </button>
  );
};

export default ThemeToggle;
