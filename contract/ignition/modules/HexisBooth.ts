import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config";
import { zeroAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { PaymentOption, SaleType } from "../../lib/shared";

const HexisBoothModule = buildModule("HexisBooth", (m) => {
  const ADMIN_PRIVATE_KEY = vars.get("ADMIN_PRIVATE_KEY") as `0x${string}`;
  const account = privateKeyToAccount(ADMIN_PRIVATE_KEY);

  const storage = m.contract("HexisBooth", [
    account.address,

    1000000n,
    PaymentOption.ERC20Token,
    zeroAddress,
    SaleType.InstantSale,
  ]);

  return {
    storage,
  };
});

export default HexisBoothModule;
