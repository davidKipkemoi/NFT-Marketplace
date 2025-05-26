import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';

const StatsSection = () => {
    // Stats data
    const stats = [
        {
            value: "30K+",
            label: "Artists",
            icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        },
        {
            value: "142K",
            label: "Digital Collections",
            icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        },
        {
            value: "$12.8M",
            label: "Trading Volume",
            icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
        },
        {
            value: "245%",
            label: "Annual Growth",
            icon: "M23 6l-9.5 9.5-5-5L1 18"
        }
    ];

    return (
        <Section 
            bgClassName="bg-slate-900 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-20"></div>
            
            <SectionTitle 
                title="Platform Growth" 
                subtitle="Our community is growing rapidly, with new artists and collectors joining every day" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <motion.div 
                        key={index}
                        className="flex flex-col items-center p-6 bg-gradient-to-b from-slate-800/40 to-zinc-900/40 backdrop-blur-sm rounded-lg border border-slate-700/30"
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            visible: { opacity: 1, scale: 1 }
                        }}
                        whileHover={{ 
                            y: -5,
                            boxShadow: "0 10px 25px rgba(100, 116, 139, 0.2)",
                        }}
                    >
                        <div className="w-16 h-16 mb-5 rounded-lg bg-gradient-to-br from-slate-700 to-zinc-800 flex items-center justify-center shadow-lg border border-slate-600/50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label={stat.label}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                            </svg>
                        </div>
                        <motion.div 
                            className="text-3xl font-bold text-white mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        >
                            {stat.value}
                        </motion.div>
                        <div className="text-slate-400">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default StatsSection; 