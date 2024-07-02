import { useQuery } from '@tanstack/react-query';

import { CardLoader } from '@/components';
import { OrderList } from '@/features';
import { fetchSaleOrders } from '@/lib';

const MarketPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders', 'sell'],
    queryFn: () => fetchSaleOrders(),
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
      <h1 className="text-3xl">Market</h1>
      <OrderList orders={data} mode="market" />
    </div>
  );
};

export default MarketPage;
