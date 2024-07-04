import { getBlockNumber, signMessage } from '@wagmi/core';
import random from 'crypto-random-bigint';
import { useState } from 'react';
import { encodePacked, keccak256, toBytes } from 'viem';
import { useTransactionReceipt, useWriteContract } from 'wagmi';
import { currentChain, wagmiConfig } from 'wagmiConfig';

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
import { marketplaceAddress, marketplaceContract } from '@/constants';
import { bytes, FullOrder, OrderDto } from '@/types';

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
  address: bytes;
}) => {
  const [price, setPrice] = useState<number>(0);

  const { data: hash, error, writeContract } = useWriteContract();

  const { isLoading, isSuccess } = useTransactionReceipt({ hash });

  const handleBuy = async () => {
    if (price == 0) {
      return;
    }

    const blockNumber = await getBlockNumber(wagmiConfig);

    const _order: OrderDto = {
      createdAt: blockNumber,
      nftId: BigInt(order.nftId),
      orderType: 1,
      price: BigInt(price),
      sender: address,
      status: 0,
    };

    const nonce = random(128);

    const hash = keccak256(
      encodePacked(
        [
          'uint256',
          'uint256',
          'uint8',
          'uint256',
          'address',
          'uint8',
          'uint256',
          'uint256',
          'address',
        ],
        [
          _order.createdAt,
          BigInt(_order.nftId),
          _order.orderType,
          _order.price,
          _order.sender,
          _order.status,
          BigInt(currentChain.id),
          nonce,
          marketplaceAddress,
        ],
      ),
    );

    const signature = await signMessage(wagmiConfig, {
      message: { raw: toBytes(hash) },
    });

    writeContract({
      ...marketplaceContract,
      functionName: 'createOrder',
      args: [_order, signature, nonce],
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
  orders,
}: {
  order: FullOrder;
  orders: FullOrder[];
}) => {
  const { data: hash, error: writeError } = useWriteContract();

  const { isLoading, isSuccess } = useTransactionReceipt({ hash });

  const handleSell = async () => {
    if (orders == undefined || orders.length == 0) {
      return;
    }
    const sellOrderId = orders.find(
      (sellOrder) =>
        sellOrder.nftId == order.nftId && sellOrder.orderType === 0,
    )?.id;

    if (sellOrderId == undefined) {
      throw new Error('Sell order not found');
    }

    // writeContract({
    //   ...marketplaceContract,
    //   functionName: 'processOrder',
    //   args: [sellOrderId, order.id],
    // });
  };

  return (
    <Card className="flex h-fit w-fit flex-col gap-2 p-4">
      <OrderInfo order={order} />
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Want to sell?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 p-4">
            <Button
              disabled={orders == undefined || orders.length == 0}
              onClick={handleSell}
            >
              Sell
            </Button>
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
  const { data: hash, error: writeError } = useWriteContract();

  const { isLoading, isSuccess } = useTransactionReceipt({ hash });

  const handleBuy = async () => {
    // writeContract({
    //   ...marketplaceContract,
    //   functionName: 'cancelOrder',
    //   args: [order.id],
    // });
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
