import { Route, Routes } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { ROUTE } from './constants';
import { Layout } from './features';
import { HomePage, MarketPage } from './pages';

const App = () => {
  const { isConnected } = useAccount();

  return (
    <>
      <Routes>
        <Route path={ROUTE.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path={ROUTE.MARKET} element={<MarketPage />} />

          {isConnected && (
            <>
              <Route path={ROUTE.ORDERS} element={<div>Orders</div>} />
              <Route path={ROUTE.LIST} element={<div>List</div>} />
            </>
          )}

          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
