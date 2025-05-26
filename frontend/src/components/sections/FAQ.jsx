import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../../data/staticData';
import { useCursor } from '../../context/CursorContext';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { enterHover, leaveHover } = useCursor();
  
  return (
    <div className="space-y-4" role="region" aria-label="Frequently Asked Questions">
      {faqs.map((faq, index) => (
        <motion.div 
          key={index}
          className="border border-slate-700/50 rounded-lg overflow-hidden bg-gradient-to-r from-slate-800/30 to-zinc-900/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.button
            className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-inset"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            whileHover={{ backgroundColor: "rgba(51, 65, 85, 0.3)" }}
            onMouseEnter={() => enterHover("button")}
            onMouseLeave={leaveHover}
            aria-expanded={activeIndex === index}
            aria-controls={`faq-content-${index}`}
          >
            <h3 className="text-lg font-medium text-white">{faq.question}</h3>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
          
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                id={`faq-content-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-slate-400 border-t border-slate-700/30">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default FAQ; 