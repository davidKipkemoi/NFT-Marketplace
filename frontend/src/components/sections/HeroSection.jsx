import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerChildren } from '../../data/animationVariants';
import { useCursor } from '../../context/CursorContext';
import Button from '../ui/Button';

const BackgroundShapes = () => (
  <motion.div 
    className="absolute inset-0 overflow-hidden opacity-20"
    animate={{ opacity: [0.75, 0.25, 0.75] }}
    transition={{ 
      repeat: Infinity, 
      duration: 5,
      ease: "easeInOut"
    }}
  >
    <motion.div 
      className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-zinc-400 to-slate-300 blur-2xl"
      animate={{ 
        scale: [1, 1.05, 1],
        x: [0, 10, 0],
        y: [0, -10, 0],
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 12,
        ease: "easeInOut"
      }}
    />
    <motion.div 
      className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-l from-zinc-500 to-slate-400 blur-2xl"
      animate={{ 
        scale: [1, 1.1, 1],
        x: [0, -15, 0],
        y: [0, 15, 0],
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 15,
        ease: "easeInOut"
      }}
    />
    <motion.div 
      className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full bg-gradient-to-b from-zinc-600 to-slate-500 blur-2xl"
      animate={{ 
        scale: [1, 1.15, 1],
        x: [0, 20, 0],
        y: [0, 5, 0],
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 18,
        ease: "easeInOut"
      }}
    />
  </motion.div>
);

const ScrollIndicator = () => (
  <motion.div 
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    animate={{ 
      y: [0, 8, 0],
      opacity: [0.5, 1, 0.5]
    }}
    transition={{ 
      repeat: Infinity, 
      duration: 2,
      ease: "easeInOut"
    }}
    aria-hidden="true"
  >
    <div className="w-8 h-12 rounded-full border-2 border-slate-400/30 flex items-start justify-center p-2">
      <div className="w-1 h-2 bg-slate-400/80 rounded-full"></div>
    </div>
  </motion.div>
);

const HeroSection = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { enterHover, leaveHover } = useCursor();

  return (
    <section className="bg-gradient-to-r from-slate-900 via-zinc-800 to-slate-900 min-h-screen flex items-center relative overflow-hidden">
      {/* Animated metallic abstract shapes */}
      <BackgroundShapes />
      
      <motion.div 
        ref={heroRef}
        className="container mx-auto px-6 z-10 relative"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={staggerChildren}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight"
          variants={fadeInUp}
        >
          Digital Art Redefined in <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-slate-400">The Metaverse</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-slate-300 max-w-2xl mb-10 font-light"
          variants={fadeInUp}
        >
          The premier digital gallery where contemporary aesthetics meet fine art. Create. Exhibit. Profit.
        </motion.p>
        <motion.div 
          className="flex flex-wrap gap-4"
          variants={fadeInUp}
        >
          <Button 
            variant="secondary" 
            onMouseEnter={() => enterHover("button")}
            onMouseLeave={leaveHover}
          >
            Explore Collections
          </Button>
          <Button 
            onMouseEnter={() => enterHover("button")}
            onMouseLeave={leaveHover}
          >
            Showcase Your Work
          </Button>
        </motion.div>
      </motion.div>

      {/* Background overlay with light grain texture */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      
      {/* Animated scroll indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection; 