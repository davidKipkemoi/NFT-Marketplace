import React from 'react';
import { motion } from 'framer-motion';

const Icon = ({ 
  path, 
  className = '',
  size = 'h-8 w-8',
  containerClassName = 'w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-slate-700 to-zinc-600 rounded-lg flex items-center justify-center shadow-md',
  animateHover = true,
  strokeWidth = 1.5,
  color = 'text-slate-300'
}) => {
  return (
    <motion.div 
      className={containerClassName}
      whileHover={animateHover ? { 
        rotate: 5,
        scale: 1.1,
        background: "linear-gradient(to bottom right, #64748b, #334155)"
      } : undefined}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`${size} ${color} ${className}`}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={strokeWidth} 
          d={path} 
        />
      </svg>
    </motion.div>
  );
};

export default Icon; 