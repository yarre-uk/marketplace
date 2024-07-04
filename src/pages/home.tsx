// import { signMessage, writeContract } from '@wagmi/core';
// import { encodePacked, keccak256, toBytes } from 'viem';
// import { useAccount } from 'wagmi';
// import { wagmiConfig, currentChain } from 'wagmiConfig';

// import { Button } from '@/components';
// import { marketplaceAddress, marketplaceContract } from '@/constants';
// import { OrderDto } from '@/types';

const HomePage = () => {
  // const { address } = useAccount();

  // const handleSell = async () => {
  //   const price = 1000n;
  //   const nftId = 0n;
  //   const nonce = 4n;

  //   if (!address) {
  //     return;
  //   }

  //   const _order: OrderDto = {
  //     createdAt: 100000n,
  //     nftId: nftId,
  //     orderType: 0,
  //     price: BigInt(price),
  //     sender: address,
  //     status: 0,
  //   };

  //   const a = [
  //     _order.createdAt,
  //     BigInt(_order.nftId),
  //     _order.orderType,
  //     _order.price,
  //     _order.sender,
  //     _order.status,
  //     BigInt(currentChain.id),
  //     nonce,
  //     marketplaceAddress,
  //   ] as const;

  //   const z = encodePacked(
  //     [
  //       'uint256',
  //       'uint256',
  //       'uint8',
  //       'uint256',
  //       'address',
  //       'uint8',
  //       'uint256',
  //       'uint256',
  //       'address',
  //     ],
  //     a,
  //   );

  //   console.log(a);

  //   const x = keccak256(z);

  //   const signature = await signMessage(wagmiConfig, {
  //     message: { raw: toBytes(x) },
  //   });

  //   writeContract(wagmiConfig, {
  //     ...marketplaceContract,
  //     functionName: 'createOrder',
  //     args: [_order, signature, nonce],
  //   });
  // };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      {/* <Button onClick={handleSell}>Sell</Button> */}
      <h1 className="text-2xl font-medium">Home Page</h1>
      <h2 className="text-lg font-medium">Welcome to my Raffle</h2>
      <img src="./raffle.png" alt="raffle tickets" className="w-[30%]" />
    </div>
  );
};

export default HomePage;
