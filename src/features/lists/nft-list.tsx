import { Card, NFTItem } from '@/components';
import { UserNFT } from '@/types';

export const NFTList = ({ nfts }: { nfts: UserNFT[] }) => {
  return (
    <Card className="flex flex-wrap justify-evenly gap-4 p-8">
      {nfts.map((nft) => (
        <NFTItem key={nft.token_id} nft={nft} />
      ))}
    </Card>
  );
};
