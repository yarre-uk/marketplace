import { Button, Card } from '@/components';
import { UserNFT } from '@/types';

const NFTItem = ({ nft }: { nft: UserNFT }) => {
  return (
    <Card className="flex h-fit w-fit flex-col gap-1 p-4">
      <p className="text-lg">Id: {nft.token_id}</p>
      <img src={nft.token_uri} className="mx-auto rounded-md" alt="token_uri" />
      <Button>Sell</Button>
    </Card>
  );
};

export default NFTItem;
