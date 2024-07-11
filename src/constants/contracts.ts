import {
  erc1155Abi,
  erc1155Address,
  erc721Abi,
  erc721Address,
  marketplaceAbi,
  marketplaceAddress,
  orderbookAbi,
  orderbookAddress,
  wethAbi,
  wethAddress,
} from '.';

import { bytes } from '@/types';

type Contract = {
  address: bytes;
  abi: object;
};

export const marketplaceContract = {
  address: marketplaceAddress,
  abi: marketplaceAbi,
} as const satisfies Contract;

export const erc721Contract = {
  address: erc721Address,
  abi: erc721Abi,
} as const satisfies Contract;

export const wethContract = {
  address: wethAddress,
  abi: wethAbi,
} as const satisfies Contract;

export const erc1155Contract = {
  address: erc1155Address,
  abi: erc1155Abi,
} as const satisfies Contract;

export const orderbookContract = {
  address: orderbookAddress,
  abi: orderbookAbi,
} as const satisfies Contract;
