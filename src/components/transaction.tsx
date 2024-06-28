import { WriteContractErrorType } from '@wagmi/core';
import { memo } from 'react';
import { BaseError } from 'wagmi';

import { bytes } from '@/types';

type TransactionInfoProps = {
  hash: bytes | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  error: WriteContractErrorType | null;
};

const TransactionInfo = ({
  error,
  hash,
  isSuccess,
  isLoading,
}: TransactionInfoProps) => {
  return (
    <div>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isLoading && <div>Waiting for confirmation...</div>}
      {isSuccess && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </div>
  );
};

export default memo(TransactionInfo);
