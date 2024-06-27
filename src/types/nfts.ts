export type NFTRequestResponse<NFTType extends AllNFT | UserNFT> = {
  nfts: NFTs<NFTType>;
};

export type NFTs<T> = {
  page: number;
  page_size: number;
  result: T[];
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
