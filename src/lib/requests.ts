import { axiosClient } from './axios';

import { FullOrder, NFTRequestResponse, bytes } from '@/types';

export const fetchUserNFTs = async (address: bytes) => {
  const response = await axiosClient.get<NFTRequestResponse>(`/nft/${address}`);
  return response.data.nfts;
};

export const fetchUserOrders = async (address: bytes) => {
  const response = await axiosClient.get<FullOrder[]>(
    `/order/user-orders/${address}`,
  );
  return response.data;
};

export const fetchSaleOrders = async () => {
  const response = await axiosClient.get<FullOrder[]>(`/order/for-sale`);
  return response.data;
};

export const fetchFilteredOrders = async (address: bytes) => {
  const response = await axiosClient.get<FullOrder[]>(
    `/order/filtered/${address}`,
  );
  return response.data;
};
