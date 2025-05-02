import React, { useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { openInMiniPay } from '../utils/deeplink'

const WalletConnect: React.FC = () => {
  // Only run inside the MiniPay app
  const isMiniPay =
    typeof window !== 'undefined' && (window as any).ethereum?.isMiniPay

  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()

  // Auto-connect inside MiniPay
  useEffect(() => {
    if (isMiniPay && connectors.length > 0 && !isConnected) {
      // Ensure the connector is ready before connecting
      const miniPayConnector = connectors.find(c => c.id === 'celo'); // Assuming your connector ID is 'celo'
      if (miniPayConnector?.ready) {
        connect({ connector: miniPayConnector })
      }
    }
  }, [isMiniPay, connectors, connect, isConnected])

  // Connected state
  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  // MiniPay fallback while connecting
  if (isMiniPay) {
    return <p>Connecting to MiniPay Wallet...</p>
  }

  // Manual connect UI for non-MiniPay environments
  const isMobile = typeof window !== 'undefined' && /Android|iPhone/.test(navigator.userAgent)

  if (isMobile) {
    // On mobile (outside MiniPay), show the button to launch MiniPay via deep link
    return (
      <button onClick={() => {
        console.log('Connect with MiniPay button clicked!');
        openInMiniPay();
      }}>
        Connect with MiniPay Wallet
      </button>
    )
  } else {
    // On desktop (outside MiniPay), show standard Wagmi connect button for the Celo connector
    const miniPayConnector = connectors.find(c => c.id === 'celo'); // Find the connector again
    return (
      <div>
        {miniPayConnector ? (
          <button
            key={miniPayConnector.id}
            onClick={() => connect({ connector: miniPayConnector })}
            disabled={!miniPayConnector.ready}
          >
            Connect with {miniPayConnector.name}
          </button>
        ) : (
          <p>MiniPay Wallet connector not found.</p> // Fallback if connector isn't available
        )}
      </div>
    )
  }
}

export default WalletConnect 