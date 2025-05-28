import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../../context/Web3Context';
import Button from './Button';

const ConnectWalletButton = ({ variant = 'primary', size = 'medium', className = '' }) => {
  const { 
    active, 
    account, 
    isConnecting, 
    error, 
    formatAddress, 
    connectWallet, 
    disconnectWallet,
    isNetworkValid
  } = useWeb3();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear timeout when component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownVisible(false);
    }, 100); // Small delay (e.g., 100ms)
  };

  // If not connected, show connect wallet button
  if (!active || !account) {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    );
  }

  // If connected to wrong network, show warning
  if (!isNetworkValid()) {
    return (
      <Button
        variant="danger"
        size={size}
        className={className}
        onClick={() => window.ethereum?.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x1' }] })}
      >
        Switch to Mainnet
      </Button>
    );
  }

  // If connected, show address and disconnect option
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        variant={variant}
        size={size}
        className={`${className} flex items-center gap-2`}
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        {formatAddress(account)}
      </Button>
      
      {isDropdownVisible && (
        <motion.div 
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 p-1 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <button 
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700 rounded-md"
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ConnectWalletButton; 