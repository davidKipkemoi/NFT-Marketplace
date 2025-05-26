import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';

const SecuritySection = () => {
    // Security features icons paths
    const securityFeatures = [
        "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", // Shield
        "M12 22s-8-4-8-10V7.5L12 2l8.5 5.5V12c0 6-8.5 10-8.5 10z", // Lock
        "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" // Security
    ];
    
    return (
        <Section bgClassName="bg-slate-900">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <motion.div 
                    className="max-w-xl"
                    variants={{ 
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                >
                    <h2 className="text-3xl font-bold text-white mb-3">Enterprise-Grade Security</h2>
                    <p className="text-slate-400 leading-relaxed">
                        Your transactions are protected with industry-leading encryption technology. Buy and sell with confidence using Ethereum, Bitcoin, and other premium cryptocurrency options.
                    </p>
                </motion.div>
                <motion.div 
                    className="flex gap-6"
                    variants={{ 
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {securityFeatures.map((path, index) => (
                        <motion.div 
                            key={index}
                            className="w-14 h-14 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg flex items-center justify-center shadow-lg border border-slate-700/50"
                            variants={{
                                hidden: { opacity: 0, scale: 0.9 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                            whileHover={{ 
                                y: -5, 
                                boxShadow: "0 10px 25px rgba(148, 163, 184, 0.2)",
                                borderColor: "rgba(148, 163, 184, 0.5)" 
                            }}
                        >
                            <motion.svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6 text-slate-300" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                aria-label={`Security feature ${index + 1}`}
                            >
                                <path d={path} />
                                {index === 1 && (
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                )}
                                {index === 2 && (
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                )}
                            </motion.svg>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};

export default SecuritySection; 