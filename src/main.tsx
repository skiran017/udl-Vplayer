import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ArweaveWalletKit } from 'arweave-wallet-kit';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ArweaveWalletKit
        config={{
          permissions: [
            'ACCESS_ADDRESS',
            'SIGN_TRANSACTION',
            'ACCESS_PUBLIC_KEY',
            'SIGNATURE',
            'DISPATCH',
          ],
          ensurePermissions: true,
        }}
        theme={{
          displayTheme: 'light',
        }}
      >
        <App />
      </ArweaveWalletKit>
    </ChakraProvider>
  </React.StrictMode>
);
