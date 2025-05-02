import { createConfig, injected, http } from 'wagmi'
import { celoAlfajores } from 'viem/chains'

// Create a custom Celo injected connector targeting window.celo (Celo Extension/MiniPay)
const celoConnector = injected({
  target: {
    id: 'celo',
    name: 'Celo Wallet',
    // provider function that returns the Celo provider injected by Celo Extension or MiniPay
    provider: () => (window as any).celo?.default ?? (window as any).celo,
  },
})

// Wagmi config using the custom Celo connector
const wagmiConfig = createConfig({
  chains: [celoAlfajores],
  connectors: [celoConnector],
  transports: {
    [celoAlfajores.id]: http(),
  },
})

export default wagmiConfig 