import { bytes } from '@/types';

export const marketplaceAddress: bytes = import.meta.env
  .VITE_PROXY_MARKETPLACE_CONTRACT_ADDRESS;

if (!marketplaceAddress) {
  throw new Error('Proxy contract addresses are not set');
}
