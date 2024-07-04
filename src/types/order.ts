import { bytes } from '.';

export type FullOrder = {
  id: bytes;
  sender: bytes;
  orderType: number;
  orderStatus: number;
  price: bigint;
  nftId: bigint;
  createdAt: bigint;
};

export type OrderDto = {
  sender: bytes;
  price: bigint;
  createdAt: bigint;
  nftId: bigint;
  orderType: number;
  status: number;
};
