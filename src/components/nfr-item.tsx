import { useState } from 'react';
import { useWriteContract, useTransactionReceipt } from 'wagmi';

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
import { UserNFT } from '@/types';

const NFTItem = ({ nft }: { nft: UserNFT }) => {
  const [price, setPrice] = useState<number>(0);

  const { data: hash, error, writeContract } = useWriteContract();

  const { isLoading, isSuccess } = useTransactionReceipt({ hash });

  const handleSell = async () => {
    if (price == 0) {
      return;
    }

    writeContract({
      ...marketplaceContract,
      functionName: 'createOrder',
      args: [BigInt(price), BigInt(nft.token_id), 0],
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
