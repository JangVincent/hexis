import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { userAccount } from "./account";

const rpcUrl = "https://eth-sepolia.g.alchemy.com/v2/LSwqyW1bpcoV4HPbxiZa7";

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
