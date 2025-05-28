import React from 'react';
import WalletConnectButton from '../components/WalletConnectButton';
import { Link } from 'react-router-dom'; // Import Link for navigation
// We might import useAuth later if needed for redirect logic within this page

function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Choose Your Authentication Method</h2>

        {/* Wallet Authentication Section */}
        <div className="mb-6 pb-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-center">Connect Your Wallet</h3>
          <div className="flex justify-center">
            <WalletConnectButton />
          </div>
          <p className="text-sm text-gray-400 mt-4 text-center">
            Connect your Ethereum wallet to sign in or create an account instantly.
          </p>
        </div>

        {/* Or Separator */}
        <div className="relative flex justify-center items-center mb-6">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gray-700 transform -translate-y-1/2"></div>
            <span className="relative bg-gray-800 px-4 text-gray-400 text-sm">OR</span>
        </div>

        {/* Email/Password Links Section */}
        <div className="text-center">
           <h3 className="text-xl font-semibold mb-4">Use Email and Password</h3>
           <div className="mb-4">
               <Link to="/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full inline-block">Login with Email</Link>
           </div>
            <div>
               <Link to="/auth/register" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full inline-block">Sign Up with Email</Link>
            </div>
        </div>

      </div>
    </div>
  );
}

export default AuthPage; 