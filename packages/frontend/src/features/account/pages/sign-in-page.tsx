import { shortenWalletAddress } from '@/lib/formatter';
import { wagmiConfig } from '@/providers/wagmi';
import { useModal } from 'connectkit';
import { useCallback, useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';
import { getAccount } from 'wagmi/actions';

export default function SignInPage() {
  const { isConnected, address } = useAccount();
  const { setOpen } = useModal();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleConnect = useCallback(async () => {
    setOpen(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const account = getAccount(wagmiConfig);
      if (account.isConnected) {
        // clear the interval once the account is connected
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, 500);
  }, [setOpen, address]);

  return (
    <div>
      <button onClick={handleConnect}>
        {isConnected ? shortenWalletAddress(address!) : 'Connect Wallet'}
      </button>
    </div>
  );
}
