import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../../data/staticData';
import { useCursor } from '../../context/CursorContext';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { enterHover, leaveHover } = useCursor();

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <Section 
      bgClassName="bg-gradient-to-b from-slate-900 to-zinc-900"
      className="relative overflow-hidden"
    >
      {/* Background animations */}
      <motion.div 
        className="absolute w-64 h-64 rounded-full bg-slate-400/5 blur-3xl -top-32 -left-32"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute w-64 h-64 rounded-full bg-slate-400/5 blur-3xl -bottom-32 -right-32"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <SectionTitle 
        title="From Our Community" 
        subtitle="Discover what artists and collectors are saying about their experience with MetaCanvas" 
        className="relative z-10"
      />

      <div className="max-w-4xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTestimonial}
            className="bg-gradient-to-b from-slate-800/50 to-zinc-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8 md:p-10"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <div className="flex mb-6" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ${i < testimonials[activeTestimonial].rating ? 'text-slate-300' : 'text-slate-600'}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <div 
                className="text-xl md:text-2xl text-slate-300 font-light italic text-center mb-8 leading-relaxed"
                aria-live="polite"
              >
                "{testimonials[activeTestimonial].quote}"
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-zinc-700 text-white font-medium text-lg shadow-md border border-slate-600">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">{testimonials[activeTestimonial].author}</div>
                  <div className="text-slate-400 text-sm">{testimonials[activeTestimonial].role}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-8 gap-3" role="tablist">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-2.5 h-2.5 rounded-full ${activeTestimonial === index ? 'bg-slate-300' : 'bg-slate-600'}`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 + index * 0.1 } }}
              aria-selected={activeTestimonial === index}
              aria-controls={`testimonial-${index}`}
              role="tab"
              onMouseEnter={() => enterHover("button")}
              onMouseLeave={leaveHover}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <div className="hidden md:block">
          <motion.button 
            className="absolute top-1/2 -translate-y-1/2 -left-12 w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 bg-slate-800/80 backdrop-blur-sm"
            onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(51, 65, 85, 0.9)" }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => enterHover("button")}
            onMouseLeave={leaveHover}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
          <motion.button 
            className="absolute top-1/2 -translate-y-1/2 -right-12 w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 bg-slate-800/80 backdrop-blur-sm"
            onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(51, 65, 85, 0.9)" }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => enterHover("button")}
            onMouseLeave={leaveHover}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </div>
    </Section>
  );
};

export default TestimonialsSection; 