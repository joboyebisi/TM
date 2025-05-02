import React, { useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

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
      connect({ connector: connectors[0] })
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
  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          Connect with {connector.name}
        </button>
      ))}
      {connectors.length === 0 && <p>No compatible wallets found</p>}
    </div>
  )
}

export default WalletConnect 