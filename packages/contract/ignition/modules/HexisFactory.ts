import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { adminAccount } from '../../lib/account';

const HexisFactoryModule = buildModule('HexisFactory', m => {
  const storage = m.contract('HexisFactory', [
    '0x9D550f4976c5Aec89C8a52f80A0f7A885b345788', // HexisBooth template address
    adminAccount.address,
  ]);

  // Booth - 0x9D550f4976c5Aec89C8a52f80A0f7A885b345788
  // Factory - 0x092d6d0050e3C450b3cC3Ab3b290373BEe56E689

  return {
    storage,
  };
});

export default HexisFactoryModule;
