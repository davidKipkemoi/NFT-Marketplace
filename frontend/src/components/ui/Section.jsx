import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { staggerChildren } from '../../data/animationVariants';

const Section = ({ 
  children, 
  className = '', 
  id,
  threshold = 0.1,
  bgClassName = 'bg-gradient-to-b from-slate-900 to-zinc-900',
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`py-20 ${bgClassName} ${className}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </motion.section>
  );
};

export default Section; 