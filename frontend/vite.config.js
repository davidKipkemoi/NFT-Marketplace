import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // To add specific polyfills needed for web3
      include: ['buffer', 'events', 'process', 'stream', 'util']
    })
  ],
  resolve: {
    alias: {
      "@": "/src",
      // Ensure proper resolution of web3 dependencies
      events: 'events',
      buffer: 'buffer',
      util: 'util'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      }
    }
  }
})
