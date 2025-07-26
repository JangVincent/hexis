import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { userAccount } from "./account";

const rpcUrl =
  "https://eth-sepolia.g.alchemy.com/v2/8c06m-WG1GSMR3MUk-yXp9T9dPNFL9tV";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(rpcUrl),
});

export const adminWallet = createWalletClient({
  account: userAccount,
  chain: sepolia,
  transport: http(rpcUrl),
});

export const userWallet = createWalletClient({
  account: userAccount,
  chain: sepolia,
  transport: http(rpcUrl),
});
