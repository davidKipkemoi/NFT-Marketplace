import React from 'react';
import { motion } from 'framer-motion';

const ArtworkModal = ({ artist, onClose }) => {
    return (
        <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.preventDefault()}
        >
            <motion.div
                className="bg-slate-900 rounded-lg max-w-4xl w-full p-6 border border-slate-700"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
            >
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{artist.name}</h2>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="text-slate-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>
                <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="mt-4">
                    <p className="text-slate-300">{artist.style}</p>
                    <p className="text-lg font-semibold mt-2">{artist.price}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ArtworkModal;