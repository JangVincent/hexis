import hre from 'hardhat';
import { adminAccount } from '../lib/account';
import { Hex } from 'viem';
import { publicClient } from '../lib/client';
import { sepolia } from 'viem/chains';
export async function deployToken(existingAddress?: Hex) {
  if (existingAddress) {
    return await hre.viem.getContractAt('TestToken', existingAddress);
  }

  const { address } = await hre.viem.deployContract('TestToken', [
    adminAccount.address,
  ]);

  return await hre.viem.getContractAt('TestToken', address);
}

export async function mintTestTokens({
  contractAddress,
  recipientAddress,
  amount,
}: {
  contractAddress: Hex;
  recipientAddress: Hex;
  amount: bigint;
}) {
  const token = await hre.viem.getContractAt('TestToken', contractAddress);

  const hash = await token.write.mint([recipientAddress, amount], {
    account: adminAccount,
    chain: sepolia,
  });

  await publicClient.waitForTransactionReceipt({
    hash,
  });

  return hash;
}
