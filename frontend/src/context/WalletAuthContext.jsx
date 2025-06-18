import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the context
const WalletAuthContext = createContext(null);

// Custom hook to use the context
export const useWalletAuth = () => {
  return useContext(WalletAuthContext);
};

// Provider component
export const WalletAuthProvider = ({ children }) => {
  const [walletToken, setWalletToken] = useState(() => localStorage.getItem('walletJwtToken'));
  const [walletUser, setWalletUser] = useState(null); // { walletAddress, profileId, exp, ... }

  // Decode JWT when it changes
  useEffect(() => {
    if (walletToken) {
      try {
        const decoded = jwtDecode(walletToken);
        setWalletUser(decoded);
      } catch (err) {
        setWalletUser(null);
      }
    } else {
      setWalletUser(null);
    }
  }, [walletToken]);

  // Set axios default Authorization header
  useEffect(() => {
    if (walletToken) {
      // Dynamically import axios to avoid circular deps
      import('axios').then(axios => {
        axios.default.defaults.headers.common['Authorization'] = `Bearer ${walletToken}`;
      });
    } else {
      import('axios').then(axios => {
        delete axios.default.defaults.headers.common['Authorization'];
      });
    }
  }, [walletToken]);

  // Login helper (store token)
  const loginWallet = useCallback((token) => {
    localStorage.setItem('walletJwtToken', token);
    setWalletToken(token);
  }, []);

  // Logout helper
  const logoutWallet = useCallback(() => {
    localStorage.removeItem('walletJwtToken');
    setWalletToken(null);
    setWalletUser(null);
  }, []);

  // Auth status
  const isWalletAuthenticated = !!walletToken && !!walletUser && (!walletUser.exp || walletUser.exp * 1000 > Date.now());

  // Context value
  const value = {
    walletToken,
    walletUser, // { walletAddress, profileId, exp, ... }
    isWalletAuthenticated,
    loginWallet,
    logoutWallet,
  };

  return (
    <WalletAuthContext.Provider value={value}>
      {children}
    </WalletAuthContext.Provider>
  );
}; 