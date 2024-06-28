import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useTransactionReceipt, useWriteContract } from 'wagmi';

import Transaction from './transaction';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  Input,
  Label,
} from '@/components';
import { marketplaceContract } from '@/constants';
import { bytes, FullOrder, QueryOrdersResponse } from '@/types';

const orderType: Record<number, string> = {
  0: 'Sale',
  1: 'Buy',
};

const orderStatus: Record<number, string> = {
  0: 'Created',
  1: 'Processed',
  2: 'Canceled',
};
const OrderInfo = ({ order }: { order: FullOrder }) => {
  return (
    <>
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
    </>
  );
};

export const MarketOrderItem = ({
  order,
  address,
}: {
  order: FullOrder;
  address: bytes | undefined;
}) => {
  const [price, setPrice] = useState<number>(0);

  const { data: hash, error, writeContract } = useWriteContract();

  const { isLoading, isSuccess } = useTransactionReceipt({ hash });

  const handleBuy = async () => {
    if (price == 0) {
      return;
    }

    writeContract({
      ...marketplaceContract,
      functionName: 'createOrder',
      args: [BigInt(price), order.nftId, 1],
    });
  };

  return (
    <Card className="flex h-fit w-fit flex-col gap-2 p-4">
      <OrderInfo order={order} />
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Want to buy?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 p-4">
            <Button
              disabled={
                address == undefined ||
                order.sender == address.toLocaleLowerCase() ||
                price == 0
              }
              onClick={handleBuy}
            >
              Buy
            </Button>
            <Label htmlFor="order-price">Order price</Label>
            <Input
              id="order-price"
              value={price}
              type="number"
              onChange={(e) => setPrice(+e.currentTarget.value)}
            />
            <Transaction
              error={error}
              hash={hash}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export const OrdersOrderItem = ({
  order,
  address,
}: {
  order: FullOrder;
  address: bytes | undefined;
}) => {
  const queryUserQueries = gql`
    query ($address: ID!) {
      orders(where: { orderStatus: 0, sender: $address }) {
        id
        sender
        orderType
        orderStatus
        price
        nftId
        createdAt
      }
    }
  `;

  const { data: orders } = useQuery<QueryOrdersResponse>(queryUserQueries, {
    variables: { address },
  });

  const { data: hash, error: writeError, writeContract } = useWriteContract();

  const { isLoading, isSuccess } = useTransactionReceipt({ hash });

  const handleSell = async () => {
    if (orders == undefined || orders.orders.length == 0) {
      return;
    }

    const sellOrderId = orders.orders.find(
      (order) => order.nftId == order.nftId,
    )?.id;

    if (sellOrderId == undefined) {
      throw new Error('Sell order not found');
    }

    writeContract({
      ...marketplaceContract,
      functionName: 'processOrder',
      args: [sellOrderId, order.id],
    });
  };

  return (
    <Card className="flex h-fit w-fit flex-col gap-2 p-4">
      <OrderInfo order={order} />
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Want to sell?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 p-4">
            <Button onClick={handleSell}>Sell</Button>
            <Transaction
              error={writeError}
              hash={hash}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export const YourOrdersOrderItem = ({ order }: { order: FullOrder }) => {
  const { data: hash, error: writeError, writeContract } = useWriteContract();

  const { isLoading, isSuccess } = useTransactionReceipt({ hash });

  const handleBuy = async () => {
    writeContract({
      ...marketplaceContract,
      functionName: 'cancelOrder',
      args: [order.id],
    });
  };

  return (
    <Card className="flex h-fit w-fit flex-col gap-2 p-4">
      <OrderInfo order={order} />
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Want to cancel?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 p-4">
            <Button onClick={handleBuy}>Cancel</Button>
            <Transaction
              error={writeError}
              hash={hash}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
