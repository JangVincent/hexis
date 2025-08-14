import { EthereumAddressValidator } from '@commons/vaildators/ethereumAddress.validator';
import z from 'zod';

export const GetBoothPaginationDtoValidationScheme = z.object({
  page: z.coerce
    .number()
    .min(1)
    .default(1)
    .transform(val => Number(val)),
  size: z.coerce
    .number()
    .min(1)
    .default(10)
    .transform(val => Number(val)),
});

export type GetBoothPaginationDTO = z.infer<
  typeof GetBoothPaginationDtoValidationScheme
>;

export const GetBoothDtoValidationScheme = z.object({
  boothId: z.string(),
});

export type GetBoothDTO = z.infer<typeof GetBoothDtoValidationScheme>;

export const CreateBoothDtoValidationScheme = z.object({
  owner: EthereumAddressValidator,
  sampleText: z.string(),
  blockNumber: z.string().min(1).regex(/^\d+$/, {
    message: 'blockNumber should be a string of numbers',
  }),
  fullText: z.string(),
});

export type CreateBoothDTO = z.infer<typeof CreateBoothDtoValidationScheme>;

export const PatchBoothParamDtoValidationScheme = z.object({
  boothId: z.string(),
});

export type PatchBoothParamDTO = z.infer<
  typeof PatchBoothParamDtoValidationScheme
>;

export const PatchBoothDtoValidationScheme = z.object({
  sampleText: z.string(),
});

export type PatchBoothDTO = z.infer<typeof PatchBoothDtoValidationScheme>;
