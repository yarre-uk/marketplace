export type AllRequestResponse = {
  nfts: AllNFTs;
};

export type AllNFTs = {
  page: number;
  page_size: number;
  result: AllNFT[];
};

export type AllNFT = {
  token_id: string;
  token_uri: string;
  minter_address: string;
};
