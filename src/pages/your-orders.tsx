import { useQuery } from '@tanstack/react-query';

import { CardLoader } from '@/components';
import { OrderList } from '@/features';
import { fetchUserOrders } from '@/lib';
import { bytes } from '@/types';

const YourOrdersPage = ({ address }: { address: bytes }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders', 'user', address],
    queryFn: () => fetchUserOrders(address),
    refetchInterval: 1000 * 60,
  });

  if (!data || isLoading || isError) {
    if (isError) {
      console.error(error);
    }

    return <CardLoader />;
  }

  return (
    <div>
      <h1 className="text-3xl">Your orders:</h1>
      <OrderList orders={data} mode="your-orders" />
    </div>
  );
};

export default YourOrdersPage;
