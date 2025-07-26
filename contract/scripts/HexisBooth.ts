import hre from "hardhat";
import { Hex, zeroAddress } from "viem";
import { PaymentOption, SaleType } from "../lib/shared";

export function getInstantSaleNativeArgs({
  ownerAddress,
  previewText,
  price,
}: {
  ownerAddress: Hex;
  previewText: string;
  price: bigint;
}) {
  return [
    ownerAddress,
    previewText,
    price,
    PaymentOption.NativeCurrency,
    zeroAddress,
    SaleType.InstantSale,
  ];
}

export async function deployBoothInstantSaleNative({
  ownerAddress,
  previewText,
  price,
}: {
  ownerAddress: Hex;
  previewText: string;
  price: bigint;
}) {
  const args = getInstantSaleNativeArgs({
    ownerAddress,
    previewText,
    price,
  });

  // @ts-ignore
  const { address } = await hre.viem.deployContract("HexisBooth", args);

  return await hre.viem.getContractAt("HexisBooth", address);
}

export function getInstantSaleERC20Args({
  ownerAddress,
  previewText,
  price,
  paymentTokenAddress,
}: {
  ownerAddress: Hex;
  previewText: string;
  price: bigint;
  paymentTokenAddress: Hex;
}) {
  return [
    ownerAddress,
    previewText,
    price,
    PaymentOption.ERC20Token,
    paymentTokenAddress,
    SaleType.InstantSale,
  ];
}

export async function deployBoothInstantSaleERC20({
  ownerAddress,
  previewText,
  price,
  paymentTokenAddress,
}: {
  ownerAddress: Hex;
  previewText: string;
  price: bigint;
  paymentTokenAddress: Hex;
}) {
  const args = getInstantSaleERC20Args({
    ownerAddress,
    previewText,
    price,
    paymentTokenAddress,
  });

  // @ts-ignore
  const { address } = await hre.viem.deployContract("HexisBooth", args);

  return await hre.viem.getContractAt("HexisBooth", address);
}

export function getRequestSaleNativeArgs({
  ownerAddress,
  previewText,
  price,
}: {
  ownerAddress: Hex;
  previewText: string;
  price: bigint;
}) {
  return [
    ownerAddress,
    previewText,
    price,
    PaymentOption.NativeCurrency,
    zeroAddress,
    SaleType.RequestSale,
  ];
}

export async function deployBoothRequestSaleNative({
  ownerAddress,
  previewText,
  price,
}: {
  ownerAddress: Hex;
  previewText: string;
  price: bigint;
}) {
  const args = getRequestSaleNativeArgs({
    ownerAddress,
    previewText,
    price,
  });

  // @ts-ignore
  const { address } = await hre.viem.deployContract("HexisBooth", args);

  return await hre.viem.getContractAt("HexisBooth", address);
}

export function getRequestSaleERC20Args({
  ownerAddress,
  previewText,
  price,
  paymentTokenAddress,
}: {
  ownerAddress: Hex;
  previewText: string;
  price: bigint;
  paymentTokenAddress: Hex;
}) {
  return [
    ownerAddress,
    previewText,
    price,
    PaymentOption.ERC20Token,
    paymentTokenAddress,
    SaleType.RequestSale,
  ];
}

export async function deployBoothRequestSaleERC20({
  ownerAddress,
  previewText,
  price,
  paymentTokenAddress,
}: {
  ownerAddress: Hex;
  previewText: string;
  price: bigint;
  paymentTokenAddress: Hex;
}) {
  const args = getRequestSaleERC20Args({
    ownerAddress,
    previewText,
    price,
    paymentTokenAddress,
  });

  // @ts-ignore
  const { address } = await hre.viem.deployContract("HexisBooth", args);

  return await hre.viem.getContractAt("HexisBooth", address);
}
