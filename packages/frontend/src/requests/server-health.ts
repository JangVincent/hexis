import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./fetcher";

export function useServerHealth() {
  return useQuery({
    queryKey: ["server-health"],
    queryFn: async () => {
      return await fetcher<{ status: "ok" }>({
        url: "/health",
      });
    },
    // Refetch every 10 minutes
    refetchInterval: 60 * 1000 * 10,
  });
}
