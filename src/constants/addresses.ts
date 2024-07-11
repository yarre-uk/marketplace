import { bytes } from '@/types';

export const marketplaceAddress: bytes = import.meta.env
  .VITE_PROXY_MARKETPLACE_CONTRACT_ADDRESS;

export const wethAddress: bytes = import.meta.env.VITE_WETH_CONTRACT_ADDRESS;

export const erc721Address: bytes = import.meta.env
  .VITE_ERC721_CONTRACT_ADDRESS;

export const erc1155Address: bytes = import.meta.env
  .VITE_ERC1155_CONTRACT_ADDRESS;

export const orderbookAddress: bytes = import.meta.env
  .VITE_ORDERBOOK_CONTRACT_ADDRESS;

if (!marketplaceAddress || !wethAddress || !erc721Address || !erc1155Address) {
  throw new Error('Proxy contract addresses are not set');
}
