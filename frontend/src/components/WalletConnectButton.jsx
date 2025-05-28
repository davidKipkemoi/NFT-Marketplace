import React, { useState, useRef, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear timeout when component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 100); // Small delay (e.g., 100ms)
  };

  if (isConnected) {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative inline-block"
      >
        Connected to {address}
        {isHovering && (
          <button
            onClick={() => disconnect()}
            className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect
          </button>
        )}
      </div>
    );
  }

  return <button onClick={() => connect({ connector: injected() })}>Connect Wallet</button>;
}

export default WalletConnectButton; 