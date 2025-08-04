import { mainnet, sepolia } from 'viem/chains';
import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox-viem';
import { vars } from 'hardhat/config';

import 'hardhat-deploy';

export const ADMIN_PRIVATE_KEY = vars.get('ADMIN_PRIVATE_KEY');
export const ETHERSCAN_API_KEY = vars.get('ETHERSCAN_API_KEY');

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  defaultNetwork: 'sepolia',
  networks: {
    hardhat: {},
    mainnet: {
      url: mainnet.rpcUrls.default.http[0],
      accounts: [ADMIN_PRIVATE_KEY],
    },
    sepolia: {
      // url: sepolia.rpcUrls.default.http[0],
      url: 'https://eth-sepolia.g.alchemy.com/v2/8c06m-WG1GSMR3MUk-yXp9T9dPNFL9tV',
      accounts: [ADMIN_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    sources: './contracts',
  },
};

export default config;
