import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick,
  className = '',
  variant = 'primary', // 'primary', 'secondary', 'outline'
  animateHover = true,
  size = 'medium', // 'small', 'medium', 'large'
  type = 'button',
  disabled = false
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-zinc-700 to-slate-600 text-white hover:from-zinc-600 hover:to-slate-500 shadow-[0_0_15px_rgba(100,116,139,0.5)]';
      case 'secondary':
        return 'bg-slate-800/60 backdrop-blur-md border border-zinc-500 text-white hover:bg-slate-700/80 shadow-[0_0_15px_rgba(100,116,139,0.5)]';
      case 'outline':
        return 'border border-slate-600 text-slate-300 bg-slate-900/80 hover:bg-slate-800/80';
      default:
        return 'bg-gradient-to-r from-zinc-700 to-slate-600 text-white hover:from-zinc-600 hover:to-slate-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm';
      case 'medium':
        return 'px-8 py-3 text-base';
      case 'large':
        return 'px-10 py-4 text-lg';
      default:
        return 'px-8 py-3 text-base';
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md font-medium transition duration-300 ${getVariantClasses()} ${getSizeClasses()} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={animateHover && !disabled ? { scale: 1.05, boxShadow: "0 0 20px rgba(148, 163, 184, 0.7)" } : undefined}
      whileTap={animateHover && !disabled ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.button>
  );
};

export default Button; 