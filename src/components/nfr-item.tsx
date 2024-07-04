import { getBlockNumber, signMessage } from '@wagmi/core';
import random from 'crypto-random-bigint';
import { useState } from 'react';
import { encodePacked, keccak256, toBytes } from 'viem';
import { useWriteContract, useTransactionReceipt } from 'wagmi';
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
import { bytes, OrderDto, UserNFT } from '@/types';

const NFTItem = ({ nft, address }: { nft: UserNFT; address: bytes }) => {
  const [price, setPrice] = useState<number>(0);
  const { data: hash, error, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useTransactionReceipt({ hash });

  const handleSell = async () => {
    if (price == 0) {
      return;
    }

    const blockNumber = await getBlockNumber(wagmiConfig);

    const _order: OrderDto = {
      createdAt: blockNumber,
      nftId: BigInt(nft.token_id),
      orderType: 0,
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
    <Card className="flex h-fit w-fit flex-col gap-1 p-4">
      <p className="text-lg">Id: {nft.token_id}</p>
      <img src={nft.token_uri} className="mx-auto rounded-md" alt="token_uri" />
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Want to sell?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 p-4">
            <Button disabled={price == 0} onClick={handleSell}>
              Create sell order
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

export default NFTItem;
