import { Button, Card } from '@/components';
import { bytes, Order } from '@/types';

const orderType: Record<number, string> = {
  0: 'Sale',
  1: 'Buy',
};

const orderStatus: Record<number, string> = {
  0: 'Created',
  1: 'Processed',
  2: 'Canceled',
};

const OrderItem = ({
  order,
  address,
}: {
  order: Order;
  address: bytes | undefined;
}) => {
  return (
    <Card className="flex h-fit w-fit flex-col gap-1 p-4">
      <p className="text-sm">Id: {order.id}</p>
      <p>Price: {order.price.toLocaleString()}</p>
      <p>NFT Id: {order.nftId.toLocaleString()}</p>
      <p>Created At: {order.createdAt.toLocaleString()}</p>
      <p className="text-sm">Sender: {order.sender}</p>
      {order.orderType != undefined && (
        <p className="text-sm">Order Type: {orderType[order.orderType]}</p>
      )}
      {order.orderStatus != undefined && (
        <p className="text-sm">
          Order Status: {orderStatus[order.orderStatus]}
        </p>
      )}
      <Button
        disabled={
          address == undefined || order.sender == address.toLocaleLowerCase()
        }
      >
        Buy
      </Button>
    </Card>
  );
};

export default OrderItem;
