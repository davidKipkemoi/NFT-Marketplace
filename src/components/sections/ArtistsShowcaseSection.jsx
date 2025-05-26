import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import ArtistCard from '../ui/ArtistCard';
import CardSkeleton from '../ui/CardSkeleton';
import image1 from "../../../public/images/artists/image1.jpg"
import ArtworkModal from '../ui/ArtworkModal';

const ArtistsShowcaseSection = () => {
    const [isHovering, setIsHovering] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);

    // Simulating data fetching from an API
    useEffect(() => {
        // In a real application, this would be an API call
        const fetchArtists = async () => {
            setIsLoading(true);
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Mock data - in a real app, this would come from an API
                const data = [
                    {
                        name: "Elena Rodriguez",
                        style: "Surrealism & Digital Art",
                        price: "2.5 ETH",
                        image:   image1,// Artwork image
                        avatar: "/images/avatars/elena-rodriguez.jpg"  // Artist avatar
                    },
                    {
                        name: "Marcus Chen",
                        style: "Generative Art",
                        price: "1.8 ETH",
                        image: image1, // Artwork image
                        avatar: "/images/avatars/elena-rodriguez.jpg"  // Artist avatar
                    },
                    {
                        name: "Sarah Johnson",
                        style: "Abstract & Digital Sculpture",
                        price: "3.2 ETH",
                        image: image1, // Artwork image
                        avatar: "/images/avatars/elena-rodriguez.jpg"  // Artist avatar
                    }
                ];
                
                setArtists(data);
            } catch (error) {
                console.error("Error fetching artists:", error);
                // Would handle error states here
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtists();
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
                    // Show artist cards when loaded
                    artists.map((artist, index) => (
                        <ArtistCard 
                            key={index} 
                            artist={artist} 
                            index={index} 
                            isHovering={isHovering} 
                            onHover={setIsHovering} 
                            onQuickPreview={setSelectedArtist}
                        />
                    ))
                )}
            </div>
            {selectedArtist && (
                <ArtworkModal 
                    artist={selectedArtist} 
                    onClose={handleCloseModal} 
                />
            )}
        </Section>
    );
};

export default ArtistsShowcaseSection; 