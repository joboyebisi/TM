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

  // Default while (auto-)connecting
  return <p>Connecting to MiniPay Wallet...</p>
}

export default WalletConnect 