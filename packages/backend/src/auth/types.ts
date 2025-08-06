import { User } from '../../db/schema';

export type LoginDTO = {
  nonce: string;
  signature: string;
  address: string;
};

export type LoginResponse = {
  user: Partial<User>;
  token: string;
};
