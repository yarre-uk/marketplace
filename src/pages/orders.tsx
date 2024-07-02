import { useQuery } from '@tanstack/react-query';

import { CardLoader } from '@/components';
import { OrderList } from '@/features';
import { fetchFilteredOrders } from '@/lib';
import { bytes } from '@/types';

const OrdersPage = ({ address }: { address: bytes }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders', 'user', 'filtered', address],
    queryFn: () => fetchFilteredOrders(address),
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
      <h1 className="text-3xl">You can sell to:</h1>
      <OrderList orders={data} mode="orders" />
    </div>
  );
};

export default OrdersPage;
