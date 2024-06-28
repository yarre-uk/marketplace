import { gql } from '@apollo/client';

export const queryOrdersForSale = gql`
  query {
    orders(where: { orderType: 0, orderStatus: 0 }) {
      id
      sender
      orderType
      orderStatus
      price
      nftId
      createdAt
    }
  }
`;

export type QueryOrdersResponse = {
  orders: FullOrder[];
};

export type FullOrder = {
  id: string;
  sender: string;
  orderType: number;
  orderStatus: number;
  price: bigint;
  nftId: bigint;
  createdAt: bigint;
};
