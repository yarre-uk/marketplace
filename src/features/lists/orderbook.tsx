import { Card } from '@/components';
import { Orderbook } from '@/types';

export const OrderbookList = ({
  buyOrders,
  sellOrders,
}: {
  buyOrders: Orderbook[];
  sellOrders: Orderbook[];
}) => {
  return (
    <Card className="flex flex-col overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Type
            </th>
            <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Price
            </th>
            <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {buyOrders.map((order, index) => (
            <tr key={`buy-${index}`} className="hover:bg-gray-100">
              <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                <p className="whitespace-no-wrap text-gray-900">Buy</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                <p className="whitespace-no-wrap text-gray-900">
                  {order.price.toString()}
                </p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                <p className="whitespace-no-wrap text-gray-900">
                  {order.amount.toString()}
                </p>
              </td>
            </tr>
          ))}
          {sellOrders.map((order, index) => (
            <tr key={`sell-${index}`} className="hover:bg-gray-100">
              <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                <p className="whitespace-no-wrap text-gray-900">Sell</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                <p className="whitespace-no-wrap text-gray-900">
                  {order.price.toString()}
                </p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                <p className="whitespace-no-wrap text-gray-900">
                  {order.amount.toString()}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
