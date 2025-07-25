import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { userAccount } from "./account";

const rpcUrl = undefined;

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
