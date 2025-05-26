import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import ConnectWalletButton from '../ui/ConnectWalletButton';

const CallToActionSection = () => {
    return (
        <Section 
            bgClassName="bg-[linear-gradient(to_right,rgba(15,23,42,0.8),rgba(51,65,85,0.8),rgba(15,23,42,0.8))] relative"
        >
            <motion.div 
                className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwYzQuNDE4IDAgOC0zLjU4MiA4LThzLTMuNTgyLTgtOC04LTggMy41ODItOCA4IDMuNTgyIDggOCA4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"
                animate={{ 
                    backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{ 
                    repeat: Infinity, 
                    repeatType: "mirror",
                    duration: 30,
                    ease: "linear"
                }}
            />
            <div className="max-w-3xl mx-auto text-center">
                <motion.h2 
                    className="text-4xl font-bold text-white mb-6"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                >
                    Ready to Enter the Digital Art Market?
                </motion.h2>
                <motion.p 
                    className="text-slate-300 mb-8 text-lg"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                >
                    Join our exclusive community of creators and collectors today.
                </motion.p>
                <ConnectWalletButton size="large" />
            </div>
        </Section>
    );
};

export default CallToActionSection; 