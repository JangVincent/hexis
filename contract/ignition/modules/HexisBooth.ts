import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";
import { getInstantSaleNativeArgs } from "../../scripts/HexisBooth";
import { adminAccount } from "../../lib/account";

const HexisBoothModule = buildModule("HexisBooth", (m) => {
  const args = getInstantSaleNativeArgs({
    ownerAddress: adminAccount.address,
    previewText: "Default Booth",
    price: parseEther("0.01"),
  });

  const storage = m.contract("HexisBooth", args);

  return {
    storage,
  };
});

export default HexisBoothModule;
