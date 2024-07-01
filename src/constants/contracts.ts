import {
  erc721Abi,
  erc721Address,
  marketplaceAbi,
  marketplaceAddress,
  wethAbi,
  wethAddress,
} from '.';

export const marketplaceContract = {
  address: marketplaceAddress,
  abi: marketplaceAbi,
} as const;

export const erc721Contract = {
  address: erc721Address,
  abi: erc721Abi,
} as const;

export const wethContract = {
  address: wethAddress,
  abi: wethAbi,
} as const;
