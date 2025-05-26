import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../data/animationVariants';

const SectionTitle = ({ 
  title, 
  subtitle,
  center = true,
  className = '',
  maxWidth = 'max-w-2xl',
  mbClassName = 'mb-16'
}) => {
  return (
    <div className={`${center ? 'text-center' : ''} ${maxWidth} ${center ? 'mx-auto' : ''} ${mbClassName} ${className}`}>
      <motion.h2 
        className="text-4xl font-bold text-white mb-4"
        variants={fadeInUp}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          className="text-xl text-slate-400"
          variants={fadeInUp}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle; 