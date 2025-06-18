import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/Card";
import { ShoppingCart, ArrowUp, ArrowDown, CirclePlus, Repeat } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const WalletCard = ({ isWalletAuthenticated, walletUser, session }) => {
  const transactions = [
    { id: 1, type: 'Bought NFT', amount: '+0.2 ETH', time: '5 min ago', status: 'success', icon: ShoppingCart },
    { id: 2, type: 'Sold NFT', amount: '-0.5 ETH', time: '1 day ago', status: 'success', icon: ArrowUp },
    { id: 3, type: 'Received', amount: '+1.0 ETH', time: '3 days ago', status: 'success', icon: ArrowDown },
    { id: 4, type: 'Minted NFT', amount: '-0.1 ETH', time: '1 week ago', status: 'pending', icon: CirclePlus },
    { id: 5, type: 'Transfer', amount: '-0.05 ETH', time: '2 weeks ago', status: 'success', icon: Repeat },
  ];

  const balanceData = [
    { name: 'Day 1', value: 1.0 },
    { name: 'Day 2', value: 1.1 },
    { name: 'Day 3', value: 0.9 },
    { name: 'Day 4', value: 1.2 },
    { name: 'Day 5', value: 1.15 },
    { name: 'Day 6', value: 1.25 },
    { name: 'Day 7', value: 1.2 },
  ];

  return (
    <Card id="wallet" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-6 relative overflow-hidden group transition-all duration-300 hover:border-pink-400 hover:shadow-xl hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] hover:scale-[1.005]">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="p-0 pb-4 relative z-10">
        <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-orange-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">Wallet & Transactions</CardTitle>
        <CardDescription className="text-sm text-gray-300">Manage your connected wallet and view activity.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 relative z-10">
        <p className="text-lg text-gray-300 mb-2">Connected Wallet:</p>
        {isWalletAuthenticated && walletUser ? (
          <p className="text-xl font-semibold break-words text-white bg-white/10 p-2 rounded-lg shadow-inner mb-2">{walletUser.walletAddress}</p>
        ) : session ? (
          <p className="text-xl font-semibold text-gray-300 bg-white/10 p-2 rounded-lg shadow-inner mb-2">Not connected to wallet</p>
        ) : (
          <p className="text-xl font-semibold text-red-400 bg-white/10 p-2 rounded-lg shadow-inner mb-2">Login to see wallet</p>
        )}
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-gray-300 font-medium drop-shadow-[0_0_5px_rgba(251,191,36,0.5)] flex items-center">
            Balance: <span className="text-yellow-300 ml-1">1.25 ETH</span> (<span className="text-green-300">$2,500</span>)
          </p>
          <div className="w-24 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <Line type="monotone" dataKey="value" stroke="#FBBF24" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold text-gray-200 mb-2">Recent Transactions:</h4>
          <div className="h-32 overflow-y-auto custom-scrollbar pr-2 bg-white/5 rounded-lg border border-white/10 shadow-inner">
            <table className="w-full text-left table-fixed">
              <thead>
                <tr className="bg-white/10 border-b border-white/20">
                  <th className="py-2 px-2 text-sm font-semibold text-gray-200 w-1/3">Type</th>
                  <th className="py-2 px-2 text-sm font-semibold text-gray-200 w-1/3">Amount</th>
                  <th className="py-2 px-2 text-sm font-semibold text-gray-200 w-1/3">Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-white/10 last:border-b-0 hover:bg-white/10 transition-colors duration-200 even:bg-white/5">
                    <td className="py-2 px-2 text-sm text-gray-300 flex items-center">
                      <transaction.icon className="h-4 w-4 mr-2" />{transaction.type}
                    </td>
                    <td className={`py-2 px-2 text-sm ${transaction.status === 'success' ? 'text-green-300' : 'text-yellow-300'}`}>{transaction.amount}</td>
                    <td className="py-2 px-2 text-sm text-gray-400">{transaction.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0 pt-6 relative z-10 text-center">
        <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-600 text-white rounded-lg hover:from-pink-600 hover:to-orange-700 transition-all duration-300 transform translate-y-0 group-hover:-translate-y-1 text-lg font-semibold shadow-lg shadow-pink-500/30 hover:shadow-pink-400/50 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:scale-[1.02] w-full max-w-xs mx-auto">View All Transactions</button>
      </CardFooter>
    </Card>
  );
};

export default WalletCard; 