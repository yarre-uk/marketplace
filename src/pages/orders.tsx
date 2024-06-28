import { CardLoader } from '@/components';
import { OrderList } from '@/features';
import useOrders from '@/hooks/useOrders';
import { bytes } from '@/types';

const OrdersPage = ({ address }: { address: bytes }) => {
  const { error, finalOrders, isError, isLoading } = useOrders(address);

  if (isLoading || isError) {
    if (error) {
      console.error(error);
    }

    return <CardLoader />;
  }

  return (
    <div>
      <h1 className="text-3xl">You can sell to:</h1>
      <OrderList orders={finalOrders} mode="orders" />
    </div>
  );
};

export default OrdersPage;
