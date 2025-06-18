import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/Card";
import { CirclePlus, ListPlus, FileText, Hourglass } from 'lucide-react';

const CreatorToolsCard = () => {
  const [draftsCount, setDraftsCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const animationDuration = 1000; // milliseconds
    const interval = 50; // milliseconds
    let currentDrafts = 0;
    let currentPending = 0;

    const draftsTimer = setInterval(() => {
      currentDrafts += 1;
      if (currentDrafts > 3) {
        clearInterval(draftsTimer);
        setDraftsCount(3);
      } else {
        setDraftsCount(currentDrafts);
      }
    }, animationDuration / 3); // Animate to 3 drafts

    const pendingTimer = setInterval(() => {
      currentPending += 1;
      if (currentPending > 1) {
        clearInterval(pendingTimer);
        setPendingCount(1);
      } else {
        setPendingCount(currentPending);
      }
    }, animationDuration / 1); // Animate to 1 pending

    return () => {
      clearInterval(draftsTimer);
      clearInterval(pendingTimer);
    };
  }, []);

  return (
    <Card id="creator-tools" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-6 relative overflow-hidden group transition-all duration-300 hover:border-green-400 hover:shadow-xl hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.8)] hover:scale-[1.005]">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="p-0 pb-4 relative z-10">
        <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">Creator Tools</CardTitle>
        <CardDescription className="text-sm text-gray-300">Tools for minting and managing your NFTs.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 relative z-10">
        <p className="text-gray-300 mb-4">Mint your unique NFTs or list existing ones for sale.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 relative z-10 text-lg font-semibold shadow-lg shadow-blue-500/30 w-full hover:shadow-blue-400/50 hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.8)] hover:scale-[1.02] flex flex-col items-center justify-center text-center group">
            <CirclePlus className="h-8 w-8 mb-2 text-blue-200 group-hover:text-white transition-colors duration-300" />
            <span className="block">Mint New NFT</span>
            <span className="text-xs text-blue-100 mt-1">Create a unique digital asset</span>
          </button>
          <button className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 relative z-10 text-lg font-semibold shadow-lg shadow-purple-500/30 w-full hover:shadow-purple-400/50 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] hover:scale-[1.02] flex flex-col items-center justify-center text-center group">
            <ListPlus className="h-8 w-8 mb-2 text-purple-200 group-hover:text-white transition-colors duration-300" />
            <span className="block">List Existing NFT</span>
            <span className="text-xs text-purple-100 mt-1">Put your collectibles on the marketplace</span>
          </button>
        </div>
      </CardContent>
      <CardFooter className="p-0 pt-6 relative z-10">
        <div className="text-sm text-gray-300 flex justify-between items-center">
          <div className="text-green-300 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)] flex items-center w-1/2">
            <FileText className="h-4 w-4 mr-1" />Current Drafts:
            <div className="flex-1 h-2 bg-white/10 rounded-full ml-2 relative">
              <div
                style={{ width: `${(draftsCount / 5) * 100}%` }} // Max 5 for visual scale
                className="h-full bg-green-400 rounded-full transition-all duration-1000 ease-out"
              ></div>
            </div>
            <span className="font-semibold ml-2">{draftsCount}</span>
          </div>
          <div className="text-yellow-300 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)] flex items-center w-1/2 justify-end text-right">
            <Hourglass className="h-4 w-4 mr-1" />Pending Listings:
            <div className="flex-1 h-2 bg-white/10 rounded-full ml-2 relative">
              <div
                style={{ width: `${(pendingCount / 3) * 100}%` }} // Max 3 for visual scale
                className="h-full bg-yellow-400 rounded-full transition-all duration-1000 ease-out"
              ></div>
            </div>
            <span className="font-semibold ml-2">{pendingCount}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CreatorToolsCard; 