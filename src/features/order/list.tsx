import { useAccount } from 'wagmi';

import { Card, OrderItem } from '@/components';
import { Order } from '@/types';

export const OrderList = ({ orders }: { orders: Order[] }) => {
  const { address } = useAccount();

  return (
    <Card className="flex flex-wrap justify-evenly gap-4 p-8">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} address={address} />
      ))}
    </Card>
  );
};
