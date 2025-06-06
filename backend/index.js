const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); // Import dotenv
const { createPublicClient, http } = require('viem'); // Import Viem client and http transport
const marketplaceRoutes = require('./src/routes/marketplaceRoutes'); // Import marketplace routes
const authRoutes = require('./src/routes/authRoutes'); // Import authentication routes

// Import Supabase client
// const { createClient } = require('@supabase/supabase-js'); // Removed
const { supabase } = require('./src/supabaseClient'); // Import from new file

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000; // Use port 5000 or environment variable

// Configure Viem client to connect to an Ethereum node
// Use an environment variable for the node URL for security
const RPC_URL = process.env.RPC_URL; // Get RPC URL from environment variables
const JWT_SECRET = process.env.JWT_SECRET; // Get JWT Secret from environment variables

// Removed Supabase environment variable checks and initialization
// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
// if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
//     console.error("FATAL ERROR: Supabase URL or Anon Key not found in environment variables.");
//     process.exit(1);
// }
// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); // Removed

const publicClient = createPublicClient({
  transport: http(RPC_URL),
  // You might need to specify a chain here, e.g., chain: mainnet, or chain: sepolia
  // depending on which network you are connecting to.
  // import { mainnet } from 'viem/chains';
});

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse incoming JSON requests

// Mount marketplace routes
app.use('/api/marketplace', marketplaceRoutes);

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('NFT Marketplace Backend is running!');
});

// TODO: Add routes for interacting with smart contracts (fetching listings, etc.)

// Start the server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});

// Export publicClient and supabase for use in other modules
module.exports = { app, publicClient, JWT_SECRET, supabase }; // Export supabase client

// You can now use 'publicClient' to interact with the blockchain, e.g.,
// async function getBlockNumber() {
//   const blockNumber = await publicClient.getBlockNumber();
//   console.log('Current block number:', blockNumber);
// }
// getBlockNumber(); 