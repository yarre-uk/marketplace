import { gql, useQuery } from '@apollo/client';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import { fetchForAddress } from '@/lib';
import { bytes, FullOrder, QueryOrdersResponse } from '@/types';

const useOrders = (address: bytes) => {
  const [finalOrders, setFinalOrders] = useState<FullOrder[]>([]);

  const {
    data,
    isLoading,
    isError,
    isRefetching,
    error: queryError,
  } = useReactQuery({
    queryKey: ['nfts', 'user', address],
    queryFn: () => fetchForAddress(address),
    refetchInterval: 1000 * 60,
  });

  const nftIdsToFilter = data?.result.map((val) => val.token_id);

  const queryOrdersByBuyAndIds = gql`
    query ($nftIds: [ID!]) {
      orders(where: { orderType: 1, orderStatus: 0, nftId_in: $nftIds }) {
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

  const queryOrdersBySellerAndIds = gql`
    query ($sender: ID!, $nftIds: [ID!]) {
      orders(
        where: {
          sender: $sender
          orderType: 0
          orderStatus: 0
          nftId_in: $nftIds
        }
      ) {
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
    data: buyOrders,
    loading: loadingBuy,
    error: graphErrorBuy,
  } = useQuery<QueryOrdersResponse>(queryOrdersByBuyAndIds, {
    variables: { nftIds: nftIdsToFilter },
    skip: !nftIdsToFilter || nftIdsToFilter.length === 0,
  });

  const {
    data: sellOrders,
    loading: loadingSell,
    error: graphErrorSell,
  } = useQuery<QueryOrdersResponse>(queryOrdersBySellerAndIds, {
    variables: { nftIds: nftIdsToFilter, sender: address },
    skip: !nftIdsToFilter || nftIdsToFilter.length === 0,
  });

  useEffect(() => {
    if (buyOrders && sellOrders) {
      const sellOrderNftIds = new Set(
        sellOrders.orders.map((order) => order.nftId),
      );

      const filteredBuyOrders = buyOrders.orders.filter((order) =>
        sellOrderNftIds.has(order.nftId),
      );

      setFinalOrders(filteredBuyOrders);
    }
  }, [buyOrders, sellOrders]);

  return {
    finalOrders,
    isLoading: isLoading || loadingBuy || loadingSell || isRefetching,
    isError: isError || !!graphErrorBuy || !!graphErrorSell,
    error: queryError || graphErrorBuy || graphErrorSell,
  };
};

export default useOrders;
