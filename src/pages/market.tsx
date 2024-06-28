import { useQuery } from '@apollo/client';

import { CardLoader } from '@/components';
import { OrderList } from '@/features';
import { queryOrdersForSale, QueryOrdersResponse } from '@/types';

const MarketPage = () => {
  const {
    data: orders,
    loading,
    error,
  } = useQuery<QueryOrdersResponse>(queryOrdersForSale);

  if (!orders || loading || error) {
    if (error) {
      console.error(error);
    }

    return <CardLoader />;
  }

  return (
    <div>
      <h1 className="text-3xl">Market</h1>
      <OrderList orders={orders.orders} mode="market" />
    </div>
  );
};

export default MarketPage;
