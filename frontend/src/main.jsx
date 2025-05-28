import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import wagmi and necessary components
import { WagmiConfig, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains' // Import chains you want to support
import { injected } from 'wagmi/connectors' // Import specific connectors
import { http, fallback } from 'viem' // Import http and fallback transports from viem

// Import QueryClient and QueryClientProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Configure wagmi
const config = createConfig({
  chains: [mainnet, sepolia], // Specify the chains your app will support
  connectors: [    
    // Add connectors for wallets you want to support
    // For example, using the Injected connector for MetaMask:
    injected(), // Use the imported injected connector
    // You can add other connectors like WalletConnect, Coinbase Wallet, etc.
  ],
  transports: {    
    // Define how to connect to the chains using RPC URLs
    [mainnet.id]: fallback([http(import.meta.env.VITE_MAINNET_RPC_URL)]),
    [sepolia.id]: fallback([http(import.meta.env.VITE_SEPOLIA_RPC_URL)]),
  },
})

// Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap with QueryClientProvider and then WagmiConfig */}
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <App />
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>,
)
