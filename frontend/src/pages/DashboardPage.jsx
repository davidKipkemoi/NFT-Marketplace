import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useWalletAuth } from '../context/WalletAuthContext';
import { useDisconnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar'; // Import the new Sidebar component
import DashboardNavbar from '../components/dashboard/DashboardNavbar'; // Import the new DashboardNavbar component
import PortfolioCard from '../components/dashboard/PortfolioCard'; // Import the new PortfolioCard component
import MarketplaceCard from '../components/dashboard/MarketplaceCard'; // Import the new MarketplaceCard component
import WalletCard from '../components/dashboard/WalletCard'; // Import the new WalletCard component
import CreatorToolsCard from '../components/dashboard/CreatorToolsCard'; // Import the new CreatorToolsCard component

const DashboardPage = () => {
  const { session, supabase, loading: supabaseLoading } = useAuth();
  const { walletUser, isWalletAuthenticated, logoutWallet } = useWalletAuth();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (session) {
      // Supabase logout
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out from Supabase:', error.message);
      } else {
        console.log('Logged out from Supabase.');
      }
    }

    if (isWalletAuthenticated) {
      // Wallet logout
      logoutWallet(); // Clears JWT from localStorage and context state
      wagmiDisconnect(); // Disconnects wallet from wagmi
      console.log('Logged out from Wallet.');
    }
    
    // Redirect to auth page after logout
    navigate('/auth');
  };

  if (supabaseLoading) {
    return <div className="text-white">Loading user data...</div>; // Render loading state while Supabase session loads
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-white">
      <Sidebar
        session={session}
        isWalletAuthenticated={isWalletAuthenticated}
        walletUser={walletUser}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-4 md:p-8 lg:p-12">
        <DashboardNavbar />

        {/* Dashboard Content Sections */}
        <section className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8 mt-6">
          {/* Top Row */}
          <div className="lg:col-span-2 flex flex-col mb-8 lg:mb-0">
            <PortfolioCard />
          </div>
          <div className="lg:col-span-3 flex flex-col mb-8 lg:mb-0">
            <MarketplaceCard />
          </div>
          {/* Second Row */}
          <div className="lg:col-span-2 flex flex-col">
            <WalletCard
              isWalletAuthenticated={isWalletAuthenticated}
              walletUser={walletUser}
              session={session}
            />
          </div>
          <div className="lg:col-span-3 flex flex-col">
            <CreatorToolsCard />
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage; 