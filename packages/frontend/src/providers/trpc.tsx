import env from '@/lib/schema/env';
import { trpc } from '@/requests/trpc';
import { httpBatchLink } from '@trpc/client';
import { queryClient } from './tanstack-query';

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${env.data?.VITE_API_HOST}/trpc`,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
}
