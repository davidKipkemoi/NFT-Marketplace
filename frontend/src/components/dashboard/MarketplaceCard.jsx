import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowUpRight, ArrowDownRight, Filter, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { motion, AnimatePresence } from "framer-motion";

const MarketplaceCard = () => {
  const [nfts, setNfts] = useState([]);
  const [currentNfts, setCurrentNfts] = useState([]);
  const [sortBy, setSortBy] = useState("price-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Generate mock NFT data
  useEffect(() => {
    const mockNfts = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `MetaCanvas NFT #${i + 1}`,
      price: (Math.random() * 2 + 0.1).toFixed(2),
      creator: `Creator ${i + 1}`,
      likes: Math.floor(Math.random() * 1000),
      timeLeft: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
      isNew: Math.random() > 0.7,
    }));
    setNfts(mockNfts);
    setCurrentNfts(mockNfts);
    setIsLoading(false);
  }, []);

  // Handle sorting and filtering
  useEffect(() => {
    let filtered = [...nfts];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(nft => 
        nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nft.creator.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-desc":
          return parseFloat(b.price) - parseFloat(a.price);
        case "likes-desc":
          return b.likes - a.likes;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    setCurrentNfts(filtered);
  }, [nfts, sortBy, searchQuery]);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)] opacity-50"></div>
      <CardHeader className="relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Live NFT Marketplace
            </CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              Discover and trade unique digital assets
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="likes-desc">Most Popular</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search NFTs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 w-[200px]"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 items-start">
          <AnimatePresence>
            {currentNfts.map((nft) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50 min-w-0"
              >
                <div className="relative w-full aspect-[4/3] max-h-[220px] rounded-lg overflow-hidden mb-3 bg-gray-800 flex items-center justify-center">
                  <img
                    src={`https://picsum.photos/seed/nft${nft.id}/400/500`}
                    alt={nft.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {nft.isNew && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-gray-200 transition-colors">
                        {nft.name}
                      </h3>
                      <p className="text-sm text-gray-400">by {nft.creator}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{nft.price} ETH</p>
                      <p className="text-xs text-gray-400">{nft.timeLeft} left</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center text-gray-400">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {nft.likes}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-800 hover:bg-gray-700 border-gray-700 text-white"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
      <CardFooter className="relative z-10 flex justify-between items-center pt-6">
        <div className="text-sm text-gray-400">
          Showing {currentNfts.length} of {nfts.length} NFTs
        </div>
        <Button
          variant="outline"
          className="bg-gray-800 hover:bg-gray-700 border-gray-700 text-white"
        >
          View All Listings
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarketplaceCard; 