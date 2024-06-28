import './index.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';

import App from './App';
import { wagmiConfig } from '../wagmiConfig';

const queryClient = new QueryClient();

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/80935/marketplace/version/latest/',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </HashRouter>,
);
