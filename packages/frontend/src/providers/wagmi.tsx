import env from '@/lib/schema/env';
import { sepolia } from 'viem/chains';
import { WagmiProvider as Provider, createConfig, http } from 'wagmi';
import { getDefaultConfig } from 'connectkit';

export const wagmiConfig = createConfig(
  getDefaultConfig({
    walletConnectProjectId: env.data?.VITE_REOWN_PROJECT_ID || '',
    appName: 'Hexis',
    appDescription: 'Hexis is a decentralized tool for direct text sale',
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(),
    },
    enableFamily: false,
  })
);

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <Provider config={wagmiConfig}>{children}</Provider>;
}
