export type NFTVariants = AllNFT | UserNFT;

export type NFTRequestResponse<NFTVariants> = {
  nfts: NFTs<NFTVariants>;
};

export type NFTs<NFTVariants> = {
  page: number;
  page_size: number;
  result: NFTVariants[];
};

export type AllNFT = {
  token_id: string;
  token_uri: string;
  minter_address: string;
};

export type UserNFT = {
  token_id: string;
  token_uri: string;
  owner_of: string;
};
