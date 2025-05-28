import React, { useState, useRef, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { injected } from 'wagmi/connectors';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Set default base URL for axios to point to the backend
// Use the environment variable VITE_BACKEND_URL
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'; // Default to 5000 if not set

function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { session, loading: authLoading } = useAuth();

  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const authenticateWallet = async () => {
      if (isConnected && address && !authLoading && !session && !isLoading) {
        setIsLoading(true);
        try {
          console.log('Requesting challenge for wallet:', address);
          // axios will now use the baseURL set above
          const challengeResponse = await axios.post('/api/auth/wallet/challenge', { walletAddress: address });
          const challenge = challengeResponse.data.challenge;
          console.log('Received challenge:', challenge);

          console.log('Prompting wallet to sign message...');
          const signature = await signMessageAsync({ message: challenge });
          console.log('Received signature:', signature);

          console.log('Sending signature for verification...');
          // axios will now use the baseURL set above
          await axios.post('/api/auth/wallet/verify', { walletAddress: address, signature });
          
          console.log('Verification process initiated via backend endpoint.');

        } catch (error) {
          console.error('Wallet authentication failed:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    authenticateWallet();

  }, [isConnected, address, authLoading, session, isLoading, signMessageAsync]);

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

  if (authLoading) {
    return <div>Loading Auth...</div>;
  }

  if (!isConnected) {
    return <button onClick={() => connect({ connector: injected() })}>Connect Wallet</button>;
  }

  if (isLoading) {
    return <div>Signing in...</div>;
  }

  if (session) {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative inline-block"
      >
        Connected & Authenticated as {address}
        {isHovering && (
          <button
            onClick={() => supabase.auth.signOut()}
            className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    );
  }

  return (
     <div className="relative inline-block">
        Wallet Connected ({address}). Please sign message...
     </div>
  );
}

export default WalletConnectButton; 