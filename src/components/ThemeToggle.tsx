"use client";
import { motion } from 'framer-motion';
import { cn } from '../lib/cn';

type Props = {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
};

export default function ThemeToggle({ isDark, onToggle, className }: Props) {
  return (
    <motion.button
      onClick={onToggle}
      className={cn(
        'relative w-12 h-6 rounded-full glass border transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={cn(
          'absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300',
          'flex items-center justify-center text-xs',
          isDark 
            ? 'left-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
            : 'left-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900'
        )}
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? '🌙' : '☀️'}
      </motion.div>
    </motion.button>
  );
}