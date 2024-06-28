import { gql, useQuery } from '@apollo/client';

import { CardLoader } from '@/components';
import { OrderList } from '@/features';
import { bytes, QueryOrdersResponse } from '@/types';

const YourOrdersPage = ({ address }: { address: bytes }) => {
  const queryUserQueries = gql`
    query ($address: ID!) {
      orders(where: { orderStatus: 0, sender: $address }) {
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

  const {
    data: orders,
    loading,
    error,
  } = useQuery<QueryOrdersResponse>(queryUserQueries, {
    variables: { address },
  });

  if (!orders || loading || error) {
    if (error) {
      console.error(error);
    }

    return <CardLoader />;
  }

  return (
    <div>
      <h1 className="text-3xl">Your orders:</h1>
      <OrderList orders={orders.orders} mode="your-orders" />
    </div>
  );
};

export default YourOrdersPage;
