
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from './provider.tsx'
import '@mysten/dapp-kit/dist/index.css'
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <App />
      <Toaster richColors position="top-right" />
    </Provider>
  </React.StrictMode>,
)
