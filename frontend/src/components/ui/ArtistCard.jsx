import React from 'react';
import { motion } from 'framer-motion';

const ArtistCard = React.memo(({ artist, index, isHovering, onHover, onQuickPreview }) => {
    return (
        <motion.div 
            key={index}
            className="rounded-lg overflow-hidden border border-slate-700/50 backdrop-blur-sm bg-gradient-to-b from-zinc-800/80 to-slate-900/80 transition-all duration-300 group"
            whileHover={{ 
                y: -10,
                boxShadow: "0 10px 25px rgba(148, 163, 184, 0.15)",
            }}
            onHoverStart={() => onHover(index)}
            onHoverEnd={() => onHover(null)}
        >
            <div className="h-64 bg-gradient-to-br from-zinc-800/20 to-slate-900/20 relative overflow-hidden">
                <motion.img 
                    src={artist.image || `https://placehold.co/600x400/334155/94a3b8.png?text=Artwork`} 
                    alt={`${artist.name}'s Artwork`}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{ 
                        scale: isHovering === index ? 1.05 : 1,
                        filter: isHovering === index ? "brightness(1.1)" : "brightness(1)"
                    }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                />
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovering === index ? 0.7 : 0 }}
                    transition={{ duration: 0.3 }}
                />
                
                {/* Quick preview button on hover */}
                {isHovering === index && (
                    <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.button
                            className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-md text-white border border-white/30"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Quick Preview"
                            onClick={() => onHover && onQuickPreview(artist)}
                        >
                            Quick Preview
                        </motion.button>
                    </motion.div>
                )}
            </div>
            <div className="p-6 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                        className="w-12 h-12 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                    >
                        <img
                            src={artist.avatar || `https://placehold.co/100/475569/cbd5e1.png?text=${artist.name.split(' ').map(n => n[0]).join('')}`}
                            alt={`${artist.name}'s avatar`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </motion.div>
                    <div>
                        <h3 className="font-semibold">{artist.name}</h3>
                        <p className="text-xs text-slate-400">{artist.style}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                    <div className="text-sm text-slate-400">
                        {index === 0 ? "Exclusive Edition" : index === 1 ? "Limited Edition" : "Collector's Edition"}
                    </div>
                    <motion.div 
                        className="text-sm font-medium text-white bg-slate-800 px-3 py-1 rounded-full border border-slate-700"
                        whileHover={{ 
                            backgroundColor: "rgba(100, 116, 139, 0.8)",
                            scale: 1.05
                        }}
                    >
                        {artist.price}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
});

export default ArtistCard; 