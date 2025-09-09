import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#0a0a0f',
          light: '#f8fafc'
        },
        surface: {
          dark: '#0f0f1a',
          light: '#ffffff'
        },
        accent: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          tertiary: '#3b82f6'
        }
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(99, 102, 241, 0.3)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.4)',
        'glow-lg': '0 0 30px rgba(99, 102, 241, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px'
      },
      keyframes: {
        'sheen-move': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)' }
        },
        'typing-dots': {
          '0%, 80%, 100%': { 
            opacity: '0.3',
            transform: 'scale(0.8)'
          },
          '40%': { 
            opacity: '1',
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        'sheen': 'sheen-move 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow-pulse 2s ease-in-out infinite',
        'typing': 'typing-dots 1.4s infinite ease-in-out'
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px'
      }
    }
  },
  plugins: []
};

export default config;