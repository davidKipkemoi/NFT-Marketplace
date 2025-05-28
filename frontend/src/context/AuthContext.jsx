import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import the Supabase client

// Create the Auth Context
const AuthContext = createContext(null);

// Create a hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the Auth Provider component
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Function to load session from localStorage and set it
    const loadSession = async () => {
      const storedSession = localStorage.getItem('supabaseSession');
      if (storedSession) {
        try {
          const parsedSession = JSON.parse(storedSession);
          // Supabase recommends setting the session client-side after retrieval
          const { data, error } = await supabase.auth.setSession({
             access_token: parsedSession.accessToken,
             refresh_token: parsedSession.refreshToken,
             expires_in: parsedSession.expiresIn,
             token_type: parsedSession.tokenType,
             user: parsedSession.user
          });

          if (error) {
            console.error('Error setting Supabase session from stored data:', error.message);
            localStorage.removeItem('supabaseSession');
            setSession(null); // Ensure session state is null if setting fails
          } else if (data && data.session) {
            setSession(data.session);
          } else {
             // Handle cases where data.session is null/undefined after setSession
             localStorage.removeItem('supabaseSession');
             setSession(null);
          }I
        } catch (error) {
          console.error('Error parsing stored session:', error);
          localStorage.removeItem('supabaseSession');
          setSession(null);
        }
      }
      setLoading(false); // Set loading to false after checking local storage
    };

    loadSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Supabase auth event:', event);
      setSession(session); // Update session state on any auth change

      // Update localStorage based on auth events
      if (session) {
         // Ensure we store the full session object structure expected by setSession later
         const { access_token, refresh_token, expires_in, token_type, user } = session;
         localStorage.setItem('supabaseSession', JSON.stringify({ accessToken: access_token, refreshToken: refresh_token, expiresIn: expires_in, tokenType: token_type, user: user }));
      } else {
        localStorage.removeItem('supabaseSession'); // Remove session on logout
      }
      setLoading(false); // Set loading to false after any auth state change
    });

    // Clean up listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  // Provide the session, loading state, and supabase client through the context
  const value = { session, loading, supabase };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
  // We render children only when not loading the initial session
}; 