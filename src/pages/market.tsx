import { useQuery } from '@tanstack/react-query';

import { CardLoader } from '@/components';
import { NFTList } from '@/features';
import { fetchAllNFTs } from '@/lib';

const MarketPage = () => {
  const { data, isLoading, isError, isRefetching, error } = useQuery({
    queryKey: ['!!!!!!!!!!!!!'],
    queryFn: fetchAllNFTs,
    refetchInterval: 1000 * 60,
  });

  if (!data || isLoading || isRefetching || isError) {
    if (isError) {
      console.error(error);
    }

    return <CardLoader />;
  }

  return (
    <div>
      <h1 className="text-3xl">Market</h1>
      <NFTList nfts={data.result} />
    </div>
  );
};

export default MarketPage;
