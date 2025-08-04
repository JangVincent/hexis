import hre from 'hardhat';
import { Hex, parseAbi, parseEventLogs, zeroAddress } from 'viem';
import { PaymentOption, SaleType } from '../lib/shared';
import { publicClient } from '../lib/client';
import { calculateTxFee } from '../lib/util';

export type BaseBoothConfig = {
  ownerAddress: Hex;
  previewText: string;
  price: bigint;
  saleType: SaleType;
};

export type PaymentConfig =
  | {
      paymentOption: PaymentOption.NativeCurrency;
    }
  | {
      paymentOption: PaymentOption.ERC20Token;
      paymentTokenAddress: Hex;
    };

export type BoothConfig = BaseBoothConfig & PaymentConfig;

function getBoothArgs(
  config: BoothConfig
): [`0x${string}`, string, bigint, number, `0x${string}`, number] {
  const { ownerAddress, previewText, price, saleType, paymentOption } = config;

  const paymentTokenAddress =
    config.paymentOption === PaymentOption.ERC20Token
      ? config.paymentTokenAddress
      : zeroAddress;

  return [
    ownerAddress,
    previewText,
    price,
    paymentOption,
    paymentTokenAddress,
    saleType,
  ];
}

export async function deployBooth(
  factoryContractAddress: Hex,
  config: BoothConfig
) {
  const factory = await hre.viem.getContractAt(
    'HexisFactory',
    factoryContractAddress
  );

  const args = getBoothArgs(config);

  const hash = await factory.write.createHexisBooth(args);

  const receipt = await publicClient.waitForTransactionReceipt({
    hash,
  });

  calculateTxFee(receipt);

  const logs = parseEventLogs({
    abi: parseAbi([
      'event BoothCreated(address indexed boothAddress, address indexed owner)',
    ]),
    logs: receipt.logs,
  });

  const boothAddress = logs[0].args.boothAddress;

  if (!boothAddress) {
    throw new Error('Booth creation failed, no address found in logs.');
  }

  return hre.viem.getContractAt('HexisBooth', boothAddress);
}
