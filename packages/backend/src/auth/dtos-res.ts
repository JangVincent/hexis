import { User } from '../../db/schema';

export type LoginResponse = {
  user: Partial<User>;
  token: string;
};
