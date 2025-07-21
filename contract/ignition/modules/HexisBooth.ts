import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config";
import { hashMessage, parseEther, zeroAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { PaymentOption, SaleType, TEST_CONFIG } from "../../config/test";

const HexisBoothModule = buildModule("HexisBooth", (m) => {
  const ADMIN_PRIVATE_KEY = vars.get("ADMIN_PRIVATE_KEY") as `0x${string}`;
  const account = privateKeyToAccount(ADMIN_PRIVATE_KEY);

  const storage = m.contract("HexisBooth", [
    account.address,
    TEST_CONFIG.PREVIEW,
    parseEther(TEST_CONFIG.PRICE),
    PaymentOption.NativeCurrency,
    zeroAddress,
    SaleType.InstantSale,
  ]);

  return {
    storage,
  };
});

export default HexisBoothModule;
