import z from 'zod';

export const LoginDtoValidationScheme = z.object({
  nonce: z.uuid(),
  signature: z.string(),
  address: z.string(),
});

export type LoginDTO = z.infer<typeof LoginDtoValidationScheme>;
