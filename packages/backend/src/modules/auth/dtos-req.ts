import { EthereumAddressValidator } from '@commons/vaildators/ethereumAddress.validator';
import z from 'zod';

export const NonceDtoValidationScheme = z.object({
  address: EthereumAddressValidator,
});

export type GetNonceDTO = z.infer<typeof NonceDtoValidationScheme>;

export const LoginDtoValidationScheme = z.object({
  nonce: z.uuid(),
  signature: z.string(),
  address: EthereumAddressValidator,
});

export type PostLoginDTO = z.infer<typeof LoginDtoValidationScheme>;
