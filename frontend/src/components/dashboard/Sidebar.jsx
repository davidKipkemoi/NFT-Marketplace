import React from 'react';
import { LayoutDashboard, Store, Wallet, Settings } from 'lucide-react';

const Sidebar = ({ session, isWalletAuthenticated, walletUser, handleLogout }) => {
  return (
    <aside className="w-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-6 flex flex-col justify-between transition-all duration-300 overflow-y-auto custom-scrollbar">
      <div>
        <img src="https://via.placeholder.com/150x50/333333/FFFFFF?text=MetaCanvas+Logo" alt="MetaCanvas Logo" className="w-48 mb-8 mx-auto filter drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
        <nav>
          <ul>
            <li className="mb-4 group"><a href="#portfolio" className="flex items-center text-lg text-gray-300 hover:text-blue-300 transition-colors duration-200 py-2 px-3 rounded-lg group-hover:bg-white/10"><LayoutDashboard className="mr-3 text-xl group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.7)] transition-all duration-200 h-6 w-6" /> Portfolio</a></li>
            <li className="mb-4 group"><a href="#marketplace" className="flex items-center text-lg text-gray-300 hover:text-purple-300 transition-colors duration-200 py-2 px-3 rounded-lg group-hover:bg-white/10"><Store className="mr-3 text-xl group-hover:text-purple-400 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] transition-all duration-200 h-6 w-6" /> Marketplace</a></li>
            <li className="mb-4 group"><a href="#wallet" className="flex items-center text-lg text-gray-300 hover:text-pink-300 transition-colors duration-200 py-2 px-3 rounded-lg group-hover:bg-white/10"><Wallet className="mr-3 text-xl group-hover:text-pink-400 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.7)] transition-all duration-200 h-6 w-6" /> Wallet</a></li>
            <li className="mb-4 group"><a href="#creator-tools" className="flex items-center text-lg text-gray-300 hover:text-green-300 transition-colors duration-200 py-2 px-3 rounded-lg group-hover:bg-white/10"><Settings className="mr-3 text-xl group-hover:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.7)] transition-all duration-200 h-6 w-6" /> Creator Tools</a></li>
          </ul>
        </nav>
      </div>
      <div className="text-sm text-gray-400 border-t border-white/10 pt-4">
        <p className="text-xs mb-2 text-gray-300">Currently logged in as:</p>
        {session && (
          <p className="font-semibold break-words text-white mb-1 px-2 py-1 bg-white/10 rounded">{session.user.email || 'Email User'}</p>
        )}
        {isWalletAuthenticated && walletUser && (
          <p className="font-semibold break-words text-white mb-1 px-2 py-1 bg-white/10 rounded">{walletUser.walletAddress}</p>
        )}
        <button
          onClick={handleLogout}
          className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-lg hover:from-red-700 hover:to-rose-800 transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:drop-shadow-[0_0_12px_rgba(220,38,38,0.7)]"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 