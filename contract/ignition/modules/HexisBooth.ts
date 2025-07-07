import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config";
import { hashMessage, parseEther, zeroAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const HexisBoothModule = buildModule("HexisBooth", (m) => {
  const ADMIN_PRIVATE_KEY = vars.get("ADMIN_PRIVATE_KEY") as `0x${string}`;

  const account = privateKeyToAccount(ADMIN_PRIVATE_KEY);

  const storage = m.contract("HexisBooth", [
    account.address,
    "This is preview message, you need to pay 0.001 ETH to watch my message",
    parseEther("0.001"),
    0,
    zeroAddress,
    0,
  ]);

  return {
    storage,
  };
});

export default HexisBoothModule;
