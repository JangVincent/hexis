import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { vars } from 'hardhat/config';
import { privateKeyToAccount } from 'viem/accounts';

const TestTokenModule = buildModule('TestToken', m => {
  const ADMIN_PRIVATE_KEY = vars.get('ADMIN_PRIVATE_KEY') as `0x${string}`;
  const account = privateKeyToAccount(ADMIN_PRIVATE_KEY);

  const storage = m.contract('TestToken', [account.address]);

  return {
    storage,
  };
});

export default TestTokenModule;
