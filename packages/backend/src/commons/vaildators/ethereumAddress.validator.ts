import { z } from 'zod';

export const EthereumAddressValidator = z
  .string(
    'Invalid input: expected small case ethereum compatible address, received other type'
  )
  .regex(/^0x[a-f0-9]{40}$/);
