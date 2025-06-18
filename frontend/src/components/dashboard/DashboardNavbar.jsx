import React, { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';

const DashboardNavbar = () => {
  const [currentPriceIndex, setCurrentPriceIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const trendingPrices = [
    { name: 'ETH', price: '3,500', change: '+2.5%', trend: 'up' },
    { name: 'BTC', price: '68,000', change: '-0.8%', trend: 'down' },
    { name: 'NFT Art Index', price: '1,200', change: '+5.1%', trend: 'up' },
    { name: 'SOL', price: '150', change: '+1.2%', trend: 'up' },
  ];

  const dummyNotifications = [
    { id: 1, message: 'New NFT listed: CryptoKitty #42', type: 'new_listing' },
    { id: 2, message: 'Your bid on MetaPunks was outbid!', type: 'bid_outbid' },
    { id: 3, message: 'Transaction confirmed: +0.5 ETH', type: 'transaction' },
    { id: 4, message: 'New collection alert: Digital Dragons', type: 'new_collection' },
  ];

  useEffect(() => {
    const priceInterval = setInterval(() => {
      setCurrentPriceIndex((prevIndex) => (prevIndex + 1) % trendingPrices.length);
    }, 3000); // Change price every 3 seconds

    let notificationIdCounter = dummyNotifications.length;

    const notificationInterval = setInterval(() => {
      // Add a new notification randomly or cycle through dummy data
      const newNotification = { 
        id: ++notificationIdCounter, 
        message: dummyNotifications[Math.floor(Math.random() * dummyNotifications.length)].message,
        type: 'info'
      };

      setNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications, newNotification];
        if (updatedNotifications.length > 3) {
          // Keep only the latest 3 notifications
          return updatedNotifications.slice(updatedNotifications.length - 3);
        }
        return updatedNotifications;
      });

    }, 5000); // Add a new notification every 5 seconds

    return () => {
      clearInterval(priceInterval);
      clearInterval(notificationInterval);
    };
  }, [trendingPrices.length]);

  const currentPrice = trendingPrices[currentPriceIndex];

  return (
    <nav className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg px-4 md:px-8 py-4 mb-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left: Title and Ticker */}
        <div className="flex flex-col w-full lg:w-auto">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-500 drop-shadow-[0_0_10px_rgba(129,140,248,0.6)] mb-2">Dashboard Overview</h2>
          <div className="w-full bg-black/30 rounded-md px-4 py-1 text-white text-sm flex flex-wrap gap-x-6 gap-y-1 items-center">
            {trendingPrices.map((item, index) => (
              <span key={index} className="flex items-center gap-1">
                <span className="font-bold">{item.name}:</span> ${item.price} <span className={item.trend === 'up' ? 'text-green-400' : 'text-red-400'}>{item.change}</span>
              </span>
            ))}
          </div>
        </div>
        {/* Right: Search, Bell, Avatar */}
        <div className="flex items-center space-x-4 w-full lg:w-auto justify-end mt-4 lg:mt-0">
          <div className="relative group w-full max-w-xs">
            <input 
              type="text" 
              placeholder="Search NFTs..." 
              className="bg-white/10 border border-white/20 rounded-lg py-2 px-4 pl-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-inner group-hover:shadow-xl group-hover:border-indigo-400 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 group-hover:text-indigo-300 transition-colors duration-200 group-hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.6)] h-5 w-5" />
          </div>
          <div className="relative">
            <button className="text-gray-300 hover:text-pink-300 text-2xl transition-all duration-200 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.7)]">
              <Bell className="h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-ping-once">{notifications.length}</span>
              )}
            </button>
            {notifications.length > 0 && (
              <div className="absolute right-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-3 z-30 opacity-0 animate-fade-in-up group-hover:opacity-100 group-hover:block hidden">
                <h6 className="text-sm font-semibold text-white mb-2">Recent Activity</h6>
                {notifications.map((notif) => (
                  <div key={notif.id} className="text-xs text-gray-300 mb-1 last:mb-0">
                    {notif.message}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(129,140,248,0.7)]">JD</div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar; 