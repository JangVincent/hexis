import * as React from "react";
import { TanStackQueryProvider } from "./tanstack-query";

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return <TanStackQueryProvider>{children}</TanStackQueryProvider>;
}
