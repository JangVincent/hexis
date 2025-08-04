import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const HexisBoothModule = buildModule('HexisBooth', m => {
  const storage = m.contract('HexisBooth');

  return {
    storage,
  };
});

export default HexisBoothModule;
