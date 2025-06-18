import React, { useState, useRef, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { injected } from 'wagmi/connectors';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useWalletAuth } from '../context/WalletAuthContext';
import { useNavigate } from 'react-router-dom';

// Set default base URL for axios to point to the backend
// Use the environment variable VITE_BACKEND_URL
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'; // Default to 5000 if not set

function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { walletUser, isWalletAuthenticated, loginWallet, logoutWallet } = useWalletAuth();
  const navigate = useNavigate();

  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [walletError, setWalletError] = useState(null);

  const handleWalletLogin = async () => {
    setIsLoading(true);
    setWalletError(null);
    try {
      const SIGN_IN_MESSAGE = "Sign in to MetaCanvas.";
      let signature;
      try {
        signature = await signMessageAsync({ message: SIGN_IN_MESSAGE });
      } catch (signError) {
        setWalletError('Signature request was rejected or failed.');
        setIsLoading(false);
        return;
      }
      const loginResponse = await axios.post('/api/auth/wallet/authenticate', {
        walletAddress: address,
        signature,
      });
      const { token } = loginResponse.data;
      if (token) {
        loginWallet(token);
        console.log('Wallet login successful! JWT stored.');
        navigate('/dashboard');
      } else {
        setWalletError('Wallet login failed: Backend did not return a token.');
      }
    } catch (error) {
      console.error('Wallet login failed:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setWalletError(`Login failed: ${error.response.data.message}`);
      } else {
        setWalletError(`An unexpected error occurred during login: ${error.message || 'unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logoutWallet();
    disconnect();
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 100);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isWalletAuthenticated && isConnected && address) {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative inline-block"
      >
        Connected & Authenticated ({walletUser?.walletAddress ? walletUser.walletAddress.substring(0, 6) + '...' + walletUser.walletAddress.slice(-4) : 'Wallet'})
        {isHovering && (
          <button
            onClick={handleLogout}
            className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    );
  }

  if (isConnected && address && !isWalletAuthenticated) {
    return (
      <div className="relative inline-block">
        <div>
          Wallet Connected ({address.substring(0, 6)}...{address.slice(-4)})
        </div>
        <button
          onClick={handleWalletLogin}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Sign In
        </button>
        {walletError && <div className="text-red-500 text-sm mt-2">Error: {walletError}</div>}
      </div>
    );
  }

  return (
    <div>
      <button 
        onClick={() => connect({ connector: injected() })}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Connect Wallet
      </button>
      {walletError && <div className="text-red-500 text-sm mt-2">Error: {walletError}</div>}
    </div>
  );
}

export default WalletConnectButton; 