import { useAccount } from 'wagmi';

import {
  Card,
  MarketOrderItem,
  OrdersOrderItem,
  YourOrdersOrderItem,
} from '@/components';
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

  return (
    <Card className="flex flex-wrap justify-evenly gap-4 p-8">
      {orders.map((order) =>
        mode === 'market' ? (
          <MarketOrderItem key={order.id} order={order} address={address} />
        ) : mode === 'orders' ? (
          <OrdersOrderItem key={order.id} order={order} address={address} />
        ) : (
          <YourOrdersOrderItem key={order.id} order={order} />
        ),
      )}
    </Card>
  );
};
