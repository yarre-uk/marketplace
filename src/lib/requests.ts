import { axiosClient } from './axios';

import { NFTRequestResponse, bytes } from '@/types';

export const fetchForAddress = async (address: bytes) => {
  const response = await axiosClient.get<NFTRequestResponse>(`/nft/${address}`);
  return response.data.nfts;
};
