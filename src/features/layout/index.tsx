import { Link, Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { ROUTE } from '@/constants';
import { Profile } from '@/features';

const PublicRoutes = [
  {
    to: ROUTE.HOME,
    label: 'HOME',
  },
  {
    to: ROUTE.MARKET,
    label: 'MARKET',
  },
] satisfies { to: string; label: string }[];

const AuthRoutes = [
  {
    to: ROUTE.LIST,
    label: 'LIST',
  },
  {
    to: ROUTE.ORDERS,
    label: 'ORDERS',
  },
] satisfies { to: string; label: string }[];

const Layout = () => {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col">
      <header className="flex h-12 w-full flex-row items-center justify-center gap-16 bg-slate-200">
        <nav className="flex gap-8">
          {PublicRoutes.map(({ to, label }) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
          {isConnected &&
            AuthRoutes.map(({ to, label }) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
        </nav>
        <Profile />
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
