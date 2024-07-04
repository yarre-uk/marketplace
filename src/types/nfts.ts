import { bytes } from './shared';

export type NFTRequestResponse = {
  nfts: NFTs;
};

export type NFTs = {
  page: number;
  page_size: number;
  result: UserNFT[];
};

export type UserNFT = {
  token_id: number;
  token_uri: string;
  owner_of: bytes;
};
