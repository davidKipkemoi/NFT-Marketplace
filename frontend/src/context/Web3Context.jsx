import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Web3ReactProvider, initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';

// Initialize MetaMask connector
const [metaMask, metaMaskHooks] = initializeConnector(
  (actions) => new MetaMask({ actions })
);

// Initialize WalletConnect connector
const [walletConnect, walletConnectHooks] = initializeConnector(
  (actions) => new WalletConnect({
    actions,
    options: {
      rpc: {
        1: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID', // Mainnet
        5: 'https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',  // Goerli
      },
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
    },
  })
);

// Create a React context for our Web3 state
const Web3Context = createContext(null);

// Helper to wrap provider into ethers.js library
function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

// Provider for Web3Context values
export function Web3ContextProvider({ children }) {
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Hooks from connectors
  const { useAccount, useChainId, useIsActive } = metaMaskHooks;
  const accountFromHook = useAccount();
  const chainIdFromHook = useChainId();
  const activeFromHook = useIsActive();

  useEffect(() => {
    setAccount(accountFromHook || '');
    setChainId(chainIdFromHook || null);
  }, [accountFromHook, chainIdFromHook]);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      await metaMask.activate();
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    try {
      metaMask.resetState();

    // If you also want to support disconnecting WalletConnect:
    walletConnect.resetState();
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
    }
  };

  const formatAddress = (address = '') =>
    address ? `${address.substring(0, 6)}...${address.slice(-4)}` : '';

  const isNetworkValid = () => chainId === 1;

  const value = {
    account,
    active: activeFromHook,
    chainId,
    error,
    isConnecting,
    formatAddress,
    isNetworkValid,
    connectWallet,
    disconnectWallet,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

// Root Web3 provider wrapping connectors and context
export function Web3Provider({ children }) {
  const connectors = [
    [metaMask, metaMaskHooks],
    [walletConnect, walletConnectHooks],
  ];

  return (
    <Web3ReactProvider connectors={connectors} getLibrary={getLibrary}>
      <Web3ContextProvider>
        {children}
      </Web3ContextProvider>
    </Web3ReactProvider>
  );
}

// Hook to consume our Web3Context
export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === null) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
