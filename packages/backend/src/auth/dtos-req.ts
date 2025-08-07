import z from 'zod';

export const LoginDtoValidationScheme = z.object({
  nonce: z.uuid(),
  signature: z.string(),
  address: z.string(),
});

export type LoginDTO = {
  nonce: string;
  signature: string;
  address: string;
};
