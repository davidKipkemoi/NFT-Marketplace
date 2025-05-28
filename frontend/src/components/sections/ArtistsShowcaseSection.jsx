import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import ArtistCard from '../ui/ArtistCard';
import CardSkeleton from '../ui/CardSkeleton';
import image1 from "../../../public/images/artists/image1.jpg"
import ArtworkModal from '../ui/ArtworkModal';
import axios from 'axios'; // Import axios

const ArtistsShowcaseSection = () => {
    const [isHovering, setIsHovering] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [artists, setArtists] = useState([]); // Renaming state to listings for clarity
    const [selectedArtist, setSelectedArtist] = useState(null);

    // Fetch NFT listings from backend API
    useEffect(() => {
        const fetchListings = async () => {
            setIsLoading(true);
            try {
                // Make GET request to backend listings endpoint
                const response = await axios.get('http://localhost:5000/api/marketplace/listings');
                // Assuming backend returns an array of listing objects
                // The current backend mock data structure matches the artist structure, so we can use it directly for now
                setArtists(response.data); // Use setArtists for now, will rename later if needed
            } catch (error) {
                console.error("Error fetching listings:", error);
                // Would handle error states here
            } finally {
                setIsLoading(false);
            }
        };

        fetchListings();
    }, []);



 

 

    // Debug: Log when the modal is closed
    const handleCloseModal = () => {
        console.log("Closing modal"); // Debug log
        setSelectedArtist(null);
    };

 

    return (
        <Section 
            bgClassName="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-slate-900 to-zinc-900"
        >
            <SectionTitle 
                title="Curated Collections" 
                subtitle="Discover exclusive works from established digital artists" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {isLoading ? (
                    // Show skeletons while loading
                    Array(3).fill(0).map((_, index) => (
                        <CardSkeleton key={index} />
                    ))
                ) : (
                    // Show artist cards when loaded (now displaying listings)
                    artists.map((listing, index) => (
                        <ArtistCard 
                            key={index} 
                            // Pass listing data to ArtistCard
                            artist={listing} // Passing listing data as 'artist' for now
                            index={index} 
                            isHovering={isHovering} 
                            onHover={setIsHovering} 
                            onQuickPreview={setSelectedArtist} // setSelectedArtist will receive listing data
                        />
                    ))
                )}
            </div>
            {selectedArtist && (
                <ArtworkModal 
                    artist={selectedArtist} // ArtworkModal will receive listing data
                    onClose={handleCloseModal} 
                />
            )}
        </Section>
    );
};

export default ArtistsShowcaseSection; 