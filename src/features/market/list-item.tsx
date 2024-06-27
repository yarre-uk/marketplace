import { Card } from '@/components';
import { AllNFT } from '@/types';

const NFTItem = ({ nft }: { nft: AllNFT }) => {
  return (
    <Card className="flex h-fit w-fit flex-col gap-1 p-4">
      <p className="text-lg">Id: {nft.token_id}</p>
      <p className="text-sm">Owner {nft.minter_address}</p>
      <img src={nft.token_uri} className="mx-auto rounded-md" alt="token_uri" />
    </Card>
  );
};

export default NFTItem;
