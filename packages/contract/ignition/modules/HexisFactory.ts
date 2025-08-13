import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { adminAccount } from '../../lib/account';

const HexisFactoryModule = buildModule('HexisFactory', m => {
  const storage = m.contract('HexisFactory', [
    '0x1B169074a6F51920BBb8607fae3D3Ff757c7da5f', // HexisBooth template address
    adminAccount.address,
  ]);

  // Booth - 0x1B169074a6F51920BBb8607fae3D3Ff757c7da5f
  // Factory - 0xa212530701b58d110bf3A308f2dA2Fa3cc500A1c

  return {
    storage,
  };
});

export default HexisFactoryModule;
