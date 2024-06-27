import { useQuery } from '@tanstack/react-query';

import NFTItem from './list-item';

import { Card, CardLoader } from '@/components';
import { fetchAllNFTs } from '@/lib';

export const MarketNFTList = () => {
  const { data, isLoading, isError, isRefetching, error } = useQuery({
    queryKey: ['all-nfts'],
    queryFn: fetchAllNFTs,
    refetchInterval: 10000,
  });

  if (isLoading || isRefetching || isError) {
    if (error) {
      console.error(error);
    }
    return <CardLoader />;
  }

  return (
    <Card className="flex flex-wrap justify-evenly gap-4 p-8">
      {data?.result.map((nft) => <NFTItem key={nft.token_id} nft={nft} />)}
    </Card>
  );
};
