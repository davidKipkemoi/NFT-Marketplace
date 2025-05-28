import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ArtworkModal = ({ artist, onClose }) => {
    const [nftMetadata, setNftMetadata] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNftMetadata = async () => {
            if (!artist || !artist.nftContractAddress || !artist.tokenId) {
                // No artist (listing) selected or missing required data
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                // Fetch NFT metadata from our backend endpoint
                const response = await axios.get(
                    `http://localhost:5000/api/marketplace/nft/${artist.nftContractAddress}/${artist.tokenId}`
                );
                setNftMetadata(response.data);
            } catch (error) {
                console.error("Error fetching NFT metadata:", error);
                setError("Failed to load NFT data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNftMetadata();
    }, [artist]); // Refetch when the selected artist (listing) changes

    // Render loading, error, or fetched data
    const renderContent = () => {
        if (isLoading) {
            return <p className="text-slate-400">Loading NFT data...</p>;
        } if (error) {
            return <p className="text-red-500">{error}</p>;
        } if (!nftMetadata) {
            return <p className="text-slate-400">No NFT data available.</p>;
        }
        
        // Display fetched NFT metadata
        return (
            <>
                {/* Display NFT Name */} {/* Use OpenSea data for title/name */}
                <h2 className="text-2xl font-bold">{nftMetadata.name || 'Untitled NFT'}</h2>
                
                {/* Display NFT Image */} {/* Use OpenSea data for image */}
                <img
                    src={nftMetadata.image || nftMetadata.image_url || ''} // Use image or image_url
                    alt={nftMetadata.name || 'NFT artwork'}
                    className="w-full h-auto max-h-[70vh] object-contain mt-4"
                />

                {/* Display NFT Description */} {/* Use OpenSea data for description */}
                {nftMetadata.description && (
                    <p className="text-slate-300 mt-4">{nftMetadata.description}</p>
                )}

                {/* Display other relevant OpenSea data, e.g., collection, owner, traits */}
                {/* Example: Display collection name */}
                {nftMetadata.collection && nftMetadata.collection.name && (
                     <p className="text-slate-400 text-sm mt-2">Collection: {nftMetadata.collection.name}</p>
                )}

                {/* Keep the price for now, but ideally this would come from our marketplace listing data */}
                {/* The 'artist' prop still contains the listing data */} {/* Use price from the listing data */}
                 {artist?.price && (
                     <p className="text-lg font-semibold mt-2">Price: {artist.price} ETH</p>
                 )}

                {/* You can add more details here based on the OpenSea API response structure */}
                {/* e.g., traits (attributes), owner information, permalink */}

            </>
        );
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
                // Allow closing by clicking outside the modal content
                 if (e.target === e.currentTarget) {
                    onClose();
                 }
            }}
            onWheel={(e) => e.preventDefault()}
        >
            <motion.div
                className="bg-slate-900 rounded-lg max-w-4xl w-full p-6 border border-slate-700 overflow-y-auto max-h-[90vh]"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()} // Prevent modal closing when clicking inside content
            >
                 <div className="flex justify-between items-start mb-4">
                    {/* Render content dynamically */} {/* Move title rendering into renderContent */}
                    {renderContent()}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="text-slate-400 hover:text-white ml-4"
                    >
                        ✕
                    </button>
                </div>
                {/* Remove direct image and text rendering here */}
                {/* <img ... /> */}
                {/* <div className="mt-4"> ... </div> */}
            </motion.div>
        </motion.div>
    );
};

export default ArtworkModal;