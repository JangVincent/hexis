import { formatEther, TransactionReceipt } from 'viem';

export async function sleep(seconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export function calculateTxFee(receipt: TransactionReceipt): void {
  if (!receipt.effectiveGasPrice || !receipt.gasUsed) {
    throw new Error(
      'Transaction receipt does not contain effectiveGasPrice or gasUsed'
    );
  }

  const wei = receipt.effectiveGasPrice * receipt.gasUsed;

  // 1eth = $3,900.74

  // wei to ether conversion
  console.log(
    '** Transaction fee:',
    Number(formatEther(wei)).toFixed(6),
    ' ETH ($',
    (Number(formatEther(wei)) * 3900.74).toFixed(2),
    '; ',
    receipt.gasUsed,
    ' gas used',
    ')'
  );
}
