import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { adminAccount } from "../../lib/account";

const HexisFactoryModule = buildModule("HexisFactory", (m) => {

  const storage = m.contract("HexisFactory", [
    "0xC9A94DB15bA35EF41c3CBeaD1AF705943F90f5bf",
    adminAccount.address,
  ]);

  return {
    storage,
  };
});

export default HexisFactoryModule;
