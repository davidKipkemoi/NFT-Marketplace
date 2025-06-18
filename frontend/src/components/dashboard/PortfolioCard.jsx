import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/Card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TrendingUp, DollarSign, Tag } from 'lucide-react';

const PortfolioCard = () => {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 700 },
    { name: 'Jun', value: 900 },
  ];

  const trendingNfts = [
    { id: 1, name: 'MetaPunks', change: '+10%', imageUrl: 'https://source.unsplash.com/random/30x30?nft,metapunks,1' },
    { id: 2, name: 'PixelPals', change: '+8%', imageUrl: 'https://source.unsplash.com/random/30x30?nft,pixelpals,2' },
    { id: 3, name: 'CyberCats', change: '+12%', imageUrl: 'https://source.unsplash.com/random/30x30?nft,cybercats,3' },
    { id: 4, name: 'AstroApes', change: '+7%', imageUrl: 'https://source.unsplash.com/random/30x30?nft,astroapes,4' },
  ];

  const metrics = [
    { id: 1, label: 'Daily Volume', value: '$5.2M', icon: TrendingUp, color: 'text-green-400' },
    { id: 2, label: 'Market Cap', value: '$500M', icon: DollarSign, color: 'text-blue-400' },
    { id: 3, label: 'Floor Price', value: '0.8 ETH', icon: Tag, color: 'text-yellow-400' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Card id="portfolio" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-6 relative overflow-hidden group transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.8)] hover:scale-[1.005]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="p-0 pb-4 relative z-10">
        <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">Your NFT Portfolio</CardTitle>
        <CardDescription className="text-sm text-gray-300">Overview of your digital assets.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 relative z-10">
        <p className="text-4xl font-bold text-teal-300 mb-2 drop-shadow-[0_0_10px_rgba(45,212,191,0.7)]">$12,345.67</p>
        <p className="text-sm text-gray-300">Total Estimated Value</p>
        
        <div className="mt-6 text-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-green-300 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">⬆️ Recent Activity: +$500 (24h)</p>
            <p className="text-sm text-gray-400">+4.2%</p>
          </div>

          <div className="mt-1 mb-4">
            <h4 className="text-sm font-semibold text-white mb-2">🔥 Trending NFTs:</h4>
            <Slider {...settings}>
              {trendingNfts.map((nft) => (
                <div key={nft.id} className="flex items-center text-purple-200 drop-shadow-[0_0_5px_rgba(192,132,252,0.5)]">
                  ✨ {nft.name} {nft.change}
                  <img src={nft.imageUrl} alt={nft.name} className="w-6 h-6 rounded-full ml-2 object-cover" />
                </div>
              ))}
            </Slider>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {metrics.map((metric) => (
              <div key={metric.id} className="bg-white/5 p-3 rounded-lg border border-white/10 shadow-inner flex flex-col items-center justify-center text-center">
                <metric.icon className={`h-6 w-6 mb-1 ${metric.color}`} />
                <p className="text-white font-semibold text-lg">{metric.value}</p>
                <p className="text-gray-400 text-xs mt-1">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4 className="text-lg font-semibold text-white mb-2">Top NFTs</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center bg-white/5 p-2 rounded-lg border border-white/10 shadow-inner">
                <img src="https://source.unsplash.com/random/40x40?nft,bored-ape" alt="Top NFT 1" className="w-10 h-10 rounded-md object-cover mr-3" />
                <div>
                  <p className="text-white font-semibold">Bored Ape #123</p>
                  <p className="text-purple-300 text-xs">1.2 ETH</p>
                </div>
              </div>
              <div className="flex items-center bg-white/5 p-2 rounded-lg border border-white/10 shadow-inner">
                <img src="https://source.unsplash.com/random/40x40?nft,cryptopunks" alt="Top NFT 2" className="w-10 h-10 rounded-md object-cover mr-3" />
                <div>
                  <p className="text-white font-semibold">CryptoPunk #456</p>
                  <p className="text-purple-300 text-xs">0.8 ETH</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full h-24 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 border border-white/20 shadow-inner hover:shadow-lg transition-all duration-300">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  cursor={{ stroke: 'rgba(96, 165, 250, 0.5)', strokeWidth: 2 }}
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="value" stroke="#60A5FA" strokeWidth={2} dot={{ stroke: '#60A5FA', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: '#A78BFA', strokeWidth: 2 }} animationDuration={1500} animationEasing="ease-in-out" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0 pt-6 relative z-10">
        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform translate-y-0 group-hover:-translate-y-1 text-lg font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50 hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.8)] hover:scale-[1.02]">View All NFTs</button>
      </CardFooter>
    </Card>
  );
};

export default PortfolioCard; 