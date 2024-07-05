import { defineChain } from 'viem';
import { http, createConfig } from 'wagmi';
import { localhost } from 'wagmi/chains';
import { metaMask, walletConnect } from 'wagmi/connectors';

const projectId = 'ae2417e63e6803e7ad042abdf9f6ca82';

export const sepolia = defineChain({
  id: 11_155_111,
  name: 'Sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://sepolia.drpc.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
      apiUrl: 'https://api-sepolia.etherscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 751532,
    },
    ensRegistry: { address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' },
    ensUniversalResolver: {
      address: '0xc8Af999e38273D658BE1b921b88A9Ddf005769cC',
      blockCreated: 5_317_080,
    },
  },
  testnet: true,
});

export const wagmiConfig = createConfig({
  chains: [sepolia, localhost],
  connectors: [walletConnect({ projectId }), metaMask()],
  transports: {
    [sepolia.id]: http(),
    [localhost.id]: http(),
  },
});

export const currentChain = sepolia;
