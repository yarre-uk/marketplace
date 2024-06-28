import { Route, Routes } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { ROUTE } from './constants';
import { Layout } from './features';
import { HomePage, ListPage, MarketPage, OrdersPage } from './pages';

const App = () => {
  const { address, isConnected } = useAccount();

  return (
    <>
      <Routes>
        <Route path={ROUTE.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path={ROUTE.MARKET} element={<MarketPage />} />

          {isConnected && address ? (
            <>
              <Route
                path={ROUTE.ORDERS}
                element={<OrdersPage address={address} />}
              />
              <Route
                path={ROUTE.LIST}
                element={<ListPage address={address} />}
              />
            </>
          ) : null}

          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
