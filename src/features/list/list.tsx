import { useQuery } from '@tanstack/react-query';

import NFTItem from './list-item';

import { Card, CardLoader } from '@/components';
import { fetchForAddress } from '@/lib';
import { bytes } from '@/types';

export const UserNFTList = ({ address }: { address: bytes }) => {
  const { data, isLoading, isError, isRefetching, error } = useQuery({
    queryKey: ['user-nfts', address],
    queryFn: () => fetchForAddress(address),
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
