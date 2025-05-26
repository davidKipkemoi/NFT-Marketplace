import React from 'react';
import { motion } from 'framer-motion';
import { scaleIn } from '../../data/animationVariants';

const Card = ({ 
  children, 
  className = '',
  hoverEffect = true,
  variants = scaleIn,
  initial = "hidden",
  animate = "visible",
  exit = "hidden",
  transition
}) => {
  const hoverStyles = hoverEffect ? {
    y: -10,
    boxShadow: "0 10px 25px rgba(100, 116, 139, 0.3)",
    borderColor: "rgba(148, 163, 184, 0.5)"
  } : {};

  return (
    <motion.div
      className={`p-6 bg-gradient-to-b from-slate-800/50 to-zinc-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg ${className}`}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      whileHover={hoverEffect ? hoverStyles : undefined}
    >
      {children}
    </motion.div>
  );
};

export default Card; 