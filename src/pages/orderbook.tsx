import { useQuery } from '@tanstack/react-query';
import { waitForTransactionReceipt } from '@wagmi/core';
import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { wagmiConfig } from 'wagmiConfig';

import {
  Button,
  CardLoader,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  TransactionInfo,
} from '@/components';
import { orderbookContract } from '@/constants';
import { OrderbookList } from '@/features';
import { axiosClient, fetchOrderbooks } from '@/lib';
import { bytes } from '@/types';

enum OrderType {
  BUY,
  SELL,
}

const OrderbookPage = () => {
  const [tokenId, setTokenId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [orderType, setOrderType] = useState<OrderType | null>(null);

  const {
    data: hash,
    error: errorContract,
    writeContractAsync,
  } = useWriteContract();

  const { isLoading: isLoadingHash, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['orderbook', 'filtered'],
    queryFn: () => fetchOrderbooks(),
    refetchInterval: 1000 * 60,
  });

  if (!data || isLoading || isError) {
    if (isError) {
      console.error(error);
    }

    return <CardLoader />;
  }

  console.log(data);

  const handleSubmit = async () => {
    const res = await axiosClient.post<bytes>('order/prepare/orderbooks', {
      tokenId: tokenId.toString(),
      price: price.toString(),
      orderType,
    });

    const _hash = await writeContractAsync({
      ...orderbookContract,
      functionName: 'createPassiveOrder',
      args: [
        BigInt(tokenId),
        BigInt(price),
        BigInt(amount),
        Number(orderType),
        res.data,
      ],
      value: orderType === OrderType.BUY ? BigInt(price * amount) : BigInt(0),
    });

    await waitForTransactionReceipt(wagmiConfig, {
      hash: _hash,
      confirmations: 1,
    });

    console.log('Refetching...');
    refetch();
  };

  return (
    <div>
      <h1 className="text-3xl">Orderbook:</h1>
      <div className="mx-auto mt-8 grid h-16 w-[80%] grid-cols-5">
        <div className="col-span-2">
          <OrderbookList
            buyOrders={data.buyOrders}
            sellOrders={data.sellOrders}
          />
        </div>
        <div className="col-span-3 flex flex-col gap-4 p-4">
          <Label>Token Id</Label>
          <Input
            type="number"
            value={tokenId}
            onChange={(e) => setTokenId(Number(e.target.value))}
            placeholder="Token ID"
          />
          <Label>Price</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
          />
          <Label>Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
          />
          <Select
            onValueChange={(e) =>
              setOrderType(e == 'SELL' ? OrderType.SELL : OrderType.BUY)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="SELL" defaultChecked>
                  SELL
                </SelectItem>
                <SelectItem value="BUY">BUY</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit}>Submit</Button>
          <TransactionInfo
            error={errorContract}
            hash={hash}
            isLoading={isLoadingHash}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderbookPage;
