import { useState } from 'react';
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { Button, Input, TransactionInfo, Card, Label } from '@/components';
import { erc721Contract, marketplaceAddress, wethContract } from '@/constants';
import { erc1155Contract } from '@/constants/contracts';
import { bytes } from '@/types';

const ApprovePage = ({ address }: { address: bytes }) => {
  const [allowance, setAllowance] = useState<number>(0);

  const { data: hash, error, writeContract } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const { data: allowanceAmount } = useReadContract({
    ...wethContract,
    functionName: 'allowance',
    args: [address, marketplaceAddress],
  });

  const onApproveWeth = () => {
    writeContract({
      ...wethContract,
      functionName: 'approve',
      args: [marketplaceAddress, BigInt(allowance)],
    });
  };

  const onERC721Approve = () => {
    writeContract({
      ...erc721Contract,
      functionName: 'setApprovalForAll',
      args: [marketplaceAddress, true],
    });
  };

  const onERC1155Approve = () => {
    writeContract({
      ...erc1155Contract,
      functionName: 'setApprovalForAll',
      args: [marketplaceAddress, true],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <Card className="flex min-w-[600px] flex-col gap-2 p-4">
        <p>Weth</p>
        <Label htmlFor="weth-amount">Amount</Label>
        <p>Allowance: {allowanceAmount?.toString()}</p>
        <Input
          id="weth-amount"
          value={allowance}
          onChange={(e) => setAllowance(+e.currentTarget.value)}
        />
        <Button onClick={onApproveWeth}>Approve</Button>
        <TransactionInfo
          error={error}
          hash={hash}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Card>
      <Card className="flex min-w-[600px] flex-col gap-2 p-4">
        <p>ERC721</p>
        <Label htmlFor="weth-amount">NFT</Label>
        <Button onClick={onERC721Approve}>Approve NFTs</Button>
        <TransactionInfo
          error={error}
          hash={hash}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Card>
      <Card className="flex min-w-[600px] flex-col gap-2 p-4">
        <p>ERC1155</p>
        <Label htmlFor="weth-amount">NFT</Label>
        <Button onClick={onERC1155Approve}>Approve NFTs</Button>
        <TransactionInfo
          error={error}
          hash={hash}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Card>
    </div>
  );
};

export default ApprovePage;
