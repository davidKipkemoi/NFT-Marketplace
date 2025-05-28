const express = require('express');
const router = express.Router();
const axios = require('axios'); // Import axios

// Import necessary modules for interacting with smart contracts
// const { publicClient } = require('../index'); // Assuming publicClient is exported from index.js
// const NFT_MARKETPLACE_ABI = require('../../smart-contracts/artifacts/contracts/Marketplace.sol/Marketplace.json').abi;
// const NFT_MARKETPLACE_ADDRESS = process.env.NFT_MARKETPLACE_ADDRESS; // Get deployed address from env

// Route to get all active NFT listings
router.get('/listings', async (req, res) => {
  try {
    // TODO: Implement logic to fetch active listings from the smart contract or backend database
    // For now, return mock data
    const mockListings = [
      {
        listingId: 1,
        seller: '0x123...',
        nftContractAddress: '0xabc...',
        tokenId: 101,
        price: '100000000000000000', // Example price in wei (0.1 ETH)
        active: true,
      },
      {
        listingId: 2,
        seller: '0x456...',
        nftContractAddress: '0xdef...',
        tokenId: 102,
        price: '200000000000000000', // Example price in wei (0.2 ETH)
        active: true,
      },
    ];

    // Example of how you might call a read function on the smart contract (requires contract instance)
    // const activeListings = await publicClient.readContract({
    //   address: NFT_MARKETPLACE_ADDRESS,
    //   abi: NFT_MARKETPLACE_ABI,
    //   functionName: 'getAllActiveListings', // Assuming you add this function to your Marketplace.sol
    // });

    res.json(mockListings); // Send mock data as JSON response
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// Route to get NFT metadata from OpenSea API
router.get('/nft/:contractAddress/:tokenId', async (req, res) => {
  try {
    const { contractAddress, tokenId } = req.params;
    // OpenSea API endpoint for a single asset
    const openseaApiUrl = `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`;

    // Make request to OpenSea API
    const response = await axios.get(openseaApiUrl, {
      headers: {
        'Accept': 'application/json',
        // If you have an OpenSea API key, you can add it here
        // 'X-API-KEY': process.env.OPENSEA_API_KEY
      },
    });

    res.json(response.data); // Send OpenSea API response back to the client
  } catch (error) {
    console.error('Error fetching NFT from OpenSea:', error);
    // Handle different error statuses, e.g., 404 if NFT not found
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Failed to fetch NFT data' });
    }
  }
});

// TODO: Add more routes for specific listing details, user listings, etc.

module.exports = router; 