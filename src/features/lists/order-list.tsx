import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import {
  Card,
  MarketOrderItem,
  OrdersOrderItem,
  YourOrdersOrderItem,
} from '@/components';
import { fetchUserOrders } from '@/lib';
import { FullOrder } from '@/types';

type OrderListMode = 'market' | 'orders' | 'your-orders';

export const OrderList = ({
  orders,
  mode,
}: {
  orders: FullOrder[];
  mode: OrderListMode;
}) => {
  const { address } = useAccount();

  const { data } = useQuery({
    queryKey: ['orders', 'user', address],
    queryFn: () => fetchUserOrders(address ?? '0x'),
    refetchInterval: 1000 * 60,
    enabled: mode === 'orders',
  });

  return (
    <Card className="flex flex-wrap justify-evenly gap-4 p-8">
      {orders.map((order) =>
        mode === 'market' ? (
          <MarketOrderItem
            key={order.id}
            order={order}
            address={address ?? '0x'}
          />
        ) : mode === 'orders' ? (
          <OrdersOrderItem key={order.id} order={order} orders={data ?? []} />
        ) : (
          <YourOrdersOrderItem key={order.id} order={order} />
        ),
      )}
    </Card>
  );
};
