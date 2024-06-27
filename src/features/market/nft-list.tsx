import { useQuery } from '@tanstack/react-query';

import { fetchAllNFTs } from '@/lib';
import { AllRequestResponse } from '@/types';

export const NFTList = () => {
  const { data } = useQuery<AllRequestResponse>({
    queryKey: ['all-nfts'],
    queryFn: fetchAllNFTs,
    refetchInterval: 10000,
  });

  console.log('data ->', data);

  return (
    <div>
      <p>asd</p>
    </div>
  );
};
