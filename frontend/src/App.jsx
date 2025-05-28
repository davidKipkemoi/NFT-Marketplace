import React, { Suspense, useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Landing from './components/Landing'
import { CursorProvider } from './context/CursorContext'
import { Web3Provider } from './context/Web3Context'
import ErrorBoundary from './components/ui/ErrorBoundary'
import Meta from './components/Meta'

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-900">
        <Meta />
        <ErrorBoundary>
          <Web3Provider>
            <CursorProvider>
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">Loading...</div>}>
                <Landing />
              </Suspense>
            </CursorProvider>
          </Web3Provider>
        </ErrorBoundary>
      </div>
    </HelmetProvider>
  )
}

export default App
