import { useQuery } from '@tanstack/react-query';
import { fetcher } from './fetcher';

export function useEthPrice() {
  return useQuery({
    queryKey: ['ethPrice'],
    queryFn: async () => {
      return await fetcher<{ USD: number }>({
        url: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
        external: true,
      });
    },
    select(data) {
      return Number(data.USD);
    },
    // Refetch every 1 minutes
    refetchInterval: 60 * 1000,
  });
}
