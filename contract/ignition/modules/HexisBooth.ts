import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { adminAccount } from "../../lib/account";

const HexisBoothModule = buildModule("HexisBooth", (m) => {
  // const args = getInstantSaleNativeArgs({
  //   ownerAddress: adminAccount.address,
  //   previewText: "Default Booth",
  //   price: parseEther("0.01"),
  // });

  const storage = m.contract("HexisBooth", [adminAccount.address]);

  return {
    storage,
  };
});

export default HexisBoothModule;
