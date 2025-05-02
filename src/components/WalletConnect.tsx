import React, { useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const WalletConnect: React.FC = () => {
  // Detect MiniPay environment via injected flag or URL param
  const simulateMiniPay = typeof window !== 'undefined' && window.location.search.includes('minipay')
  const isMiniPay = simulateMiniPay || (typeof window !== 'undefined' && (window as any).ethereum?.isMiniPay)

  const { address, isConnected } = useAccount()
  const { connectors, connect, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  // Auto-connect in MiniPay
  useEffect(() => {
    if (isMiniPay && connectors.length > 0) {
      connect({ connector: connectors[0] })
    }
  }, [isMiniPay, connectors, connect])

  // Connected state
  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  // MiniPay flow: show loading state
  if (isMiniPay) {
    return <p>Connecting to MiniPay Wallet...</p>
  }

  // Default: render all connectors
  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={!connector.ready || (isLoading && pendingConnector?.id === connector.id)}
        >
          {isLoading && pendingConnector?.id === connector.id
            ? `Connecting to ${connector.name}...`
            : `Connect with ${connector.name}`}
        </button>
      ))}
      {connectors.length === 0 && <p>No compatible wallets found</p>}
    </div>
  )
}

export default WalletConnect 