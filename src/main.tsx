import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WagmiConfig } from 'wagmi'
import wagmiConfig from './wagmi'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Instantiate React Query client for Wagmi
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WagmiConfig>
    </QueryClientProvider>
  </StrictMode>,
)
