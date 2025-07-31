import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { adminAccount } from "../../lib/account";

const HexisFactoryModule = buildModule("HexisFactory", (m) => {
  const storage = m.contract("HexisFactory", [
    adminAccount.address,
    "",
    adminAccount.address,
  ]);

  return {
    storage,
  };
});

export default HexisFactoryModule;
