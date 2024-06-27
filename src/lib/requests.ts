import { axiosClient } from './axios';

export const fetchAllNFTs = async () => {
  const response = await axiosClient.get('/all');
  return response.data;
};

export const fetchForAddress = async (address: string) => {
  const response = await axiosClient.get(`/user/${address}`);
  return response.data;
};
