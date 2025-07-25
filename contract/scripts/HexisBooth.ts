import hre from "hardhat";
import { Hex, zeroAddress } from "viem";
import { PaymentOption, SaleType } from "../lib/shared";

export async function deployBoothInstantSaleNative({
  ownerAddress,
  previewText,
  price,
}: {
  ownerAddress: Hex;
  previewText: string;
  price: bigint;
}) {
  const { address } = await hre.viem.deployContract("HexisBooth", [
    ownerAddress,
    previewText,
    price,
    PaymentOption.NativeCurrency,
    zeroAddress,
    SaleType.InstantSale,
  ]);

  return await hre.viem.getContractAt("HexisBooth", address);
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
  const { address } = await hre.viem.deployContract("HexisBooth", [
    ownerAddress,
    previewText,
    price,
    PaymentOption.ERC20Token,
    paymentTokenAddress,
    SaleType.InstantSale,
  ]);

  return await hre.viem.getContractAt("HexisBooth", address);
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
  const { address } = await hre.viem.deployContract("HexisBooth", [
    ownerAddress,
    previewText,
    price,
    PaymentOption.NativeCurrency,
    zeroAddress,
    SaleType.RequestSale,
  ]);

  return await hre.viem.getContractAt("HexisBooth", address);
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
  const { address } = await hre.viem.deployContract("HexisBooth", [
    ownerAddress,
    previewText,
    price,
    PaymentOption.ERC20Token,
    paymentTokenAddress,
    SaleType.RequestSale,
  ]);

  return await hre.viem.getContractAt("HexisBooth", address);
}
