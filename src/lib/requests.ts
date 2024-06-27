import { axiosClient } from './axios';

import { AllNFT, NFTRequestResponse, UserNFT, bytes } from '@/types';

export const fetchAllNFTs = async () => {
  const response = await axiosClient.get<NFTRequestResponse<AllNFT>>('/all');
  return response.data.nfts;
};

export const fetchForAddress = async (address: bytes) => {
  const response = await axiosClient.get<NFTRequestResponse<UserNFT>>(
    `/user/${address}`,
  );
  return response.data.nfts;
};
