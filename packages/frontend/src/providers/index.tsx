import { ConnectKitProvider } from 'connectkit';
import { lazy } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

const WagmiProvider = lazy(() =>
  import('./wagmi').then(mod => ({ default: mod.WagmiProvider }))
);

const TanStackQueryProvider = lazy(() =>
  import('./tanstack-query').then(mod => ({
    default: mod.TanStackQueryProvider,
  }))
);

export function Provider({ children }: ProviderProps) {
  return (
    <WagmiProvider>
      <TanStackQueryProvider>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </TanStackQueryProvider>
    </WagmiProvider>
  );
}
