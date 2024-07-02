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
