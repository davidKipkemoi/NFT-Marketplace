import React, { Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import { CursorProvider } from './context/CursorContext'
import { Web3Provider } from './context/Web3Context'
import ErrorBoundary from './components/ui/ErrorBoundary'
import Meta from './components/Meta'
import { AuthProvider } from './context/AuthContext'
import AuthPage from './pages/AuthPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// Placeholder components for routes
const DashboardPage = () => <div>Dashboard/Marketplace Page (Protected)</div>

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-900">
          <Meta />
          <ErrorBoundary>
            <Web3Provider>
              <CursorProvider>
                <AuthProvider>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">Loading...</div>}>
                          <Landing />
                        </Suspense>
                      }
                    />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                  </Routes>
                </AuthProvider>
              </CursorProvider>
            </Web3Provider>
          </ErrorBoundary>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
