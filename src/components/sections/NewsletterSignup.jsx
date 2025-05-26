import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const { enterHover, leaveHover } = useCursor();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsSubmitted(true);
      setIsError(false);
      // In a real app, you would send this to your API
      console.log('Submitted email:', email);
    } else {
      setIsError(true);
    }
  };
  
  return (
    <Section bgClassName="bg-gradient-to-b from-slate-900 to-zinc-900">
      <SectionTitle 
        title="Join Our Community" 
        subtitle="Be the first to receive updates and exclusive offers" 
      />
      
      <div className="w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col space-y-4"
              aria-label="Newsletter signup form"
            >
              <div className="relative">
                <label htmlFor="email-input" className="sr-only">Email address</label>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={`w-full px-4 py-3 bg-slate-800/80 border ${isError ? 'border-red-500' : 'border-slate-600'} rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200`}
                  aria-invalid={isError}
                  aria-describedby={isError ? "email-error" : undefined}
                />
                <AnimatePresence>
                  {isError && (
                    <motion.p 
                      id="email-error"
                      className="absolute text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      role="alert"
                    >
                      Please enter a valid email address
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <motion.button
                type="submit"
                className="px-6 py-3 rounded-md bg-gradient-to-r from-slate-700 to-zinc-700 text-white font-medium hover:from-slate-600 hover:to-zinc-600 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(100, 116, 139, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => enterHover("button")}
                onMouseLeave={leaveHover}
              >
                Get Early Access
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-md p-6 text-center"
              role="status"
              aria-live="polite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium text-white mb-2">Thank you for joining!</h3>
              <p className="text-slate-300">You'll be among the first to access our platform and exclusive drops.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
};

export default NewsletterSignup; 