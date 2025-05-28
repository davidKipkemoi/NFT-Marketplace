import { createClient } from '@supabase/supabase-js';

// Corrected environment variable access for Vite
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("FATAL ERROR: Supabase URL or Anon Key not found in environment variables.");
  // In a real app, you might want to display an error message to the user
}

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Optional: Add a basic effect to log auth state changes
// supabase.auth.onAuthStateChange((event, session) => {
//   console.log('Supabase auth event:', event, 'session:', session);
// }); 