import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWalletAuth } from '../context/WalletAuthContext';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isWalletAuthenticated } = useWalletAuth();
  const { session, loading: supabaseLoading } = useAuth();

  // Wait for Supabase auth to finish loading
  if (supabaseLoading) return <div>Loading...</div>;

  // If neither wallet nor Supabase is authenticated, redirect
  if (!isWalletAuthenticated && !session) {
    return <Navigate to="/auth" replace />;
  }

  // Otherwise, render the protected content
  return children;
};

export default ProtectedRoute; 