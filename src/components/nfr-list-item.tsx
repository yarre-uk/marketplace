import { Button, Card, CardLoader } from '@/components';
import { NFTVariants } from '@/types';

const NFTItem = ({ nft }: { nft: NFTVariants }) => {
  if ('owner_of' in nft && nft.owner_of != null) {
    return (
      <Card className="flex h-fit w-fit flex-col gap-1 p-4">
        <p className="text-lg">Id: {nft.token_id}</p>
        <img
          src={nft.token_uri}
          className="mx-auto rounded-md"
          alt="token_uri"
        />
        <Button>Sell</Button>
      </Card>
    );
  }

  if ('minter_address' in nft && nft.minter_address != null) {
    return (
      <Card className="flex h-fit w-fit flex-col gap-1 p-4">
        <p className="text-lg">Id: {nft.token_id}</p>
        <p>Owner: {nft.minter_address}</p>
        <img
          src={nft.token_uri}
          className="mx-auto rounded-md"
          alt="token_uri"
        />
      </Card>
    );
  }

  return <CardLoader />;
};

export default NFTItem;
