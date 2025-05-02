import React from 'react'
import WalletConnect from '../components/WalletConnect'

const Home: React.FC = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Travel Money</h1>
      <WalletConnect />
      <p>
        Welcome to Travel Money! Start by connecting your wallet to begin
        saving towards your travel goals using stablecoins.
      </p>
    </div>
  )
}

export default Home 