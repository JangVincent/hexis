import { vars } from 'hardhat/config';
import { privateKeyToAccount } from 'viem/accounts';

export const ADMIN_PRIVATE_KEY = vars.get('ADMIN_PRIVATE_KEY') as `0x${string}`;

export const USER_PRIVATE_KEY = vars.get('USER_PRIVATE_KEY') as `0x${string}`;

export const adminAccount = privateKeyToAccount(ADMIN_PRIVATE_KEY);

export const userAccount = privateKeyToAccount(USER_PRIVATE_KEY);
