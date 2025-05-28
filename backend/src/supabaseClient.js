const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Load service role key

// Check for Supabase environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("FATAL ERROR: Supabase URL, Anon Key, or Service Role Key not found in environment variables.");
    process.exit(1);
}

// Initialize Supabase client using anon key (for less privileged operations if needed)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize Supabase client using service role key (for admin operations like creating sessions)
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

module.exports = { supabase, supabaseAdmin }; 