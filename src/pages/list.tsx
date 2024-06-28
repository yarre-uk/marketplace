import { useQuery } from '@tanstack/react-query';

import { CardLoader } from '@/components';
import { NFTList } from '@/features';
import { fetchForAddress } from '@/lib';
import { bytes } from '@/types';

const ListPage = ({ address }: { address: bytes }) => {
  const { data, isLoading, isError, isRefetching, error } = useQuery({
    queryKey: ['nfts', 'user', address],
    queryFn: () => fetchForAddress(address),
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
      <h1 className="text-3xl">List</h1>
      <NFTList nfts={data.result} />
    </div>
  );
};

export default ListPage;
