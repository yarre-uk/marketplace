import { useAccount } from 'wagmi';

import { CardLoader } from '@/components';
import { UserNFTList } from '@/features';

const ListPage = () => {
  const { isConnected, address } = useAccount();

  if (!address || !isConnected) {
    return <CardLoader />;
  }

  return (
    <div>
      <p>Market</p>
      {isConnected && <UserNFTList address={address} />}
    </div>
  );
};

export default ListPage;
