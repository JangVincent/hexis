import { validationMiddleware } from '@commons/middlewares/validate.middleware';
import { Hono } from 'hono';
import { BoothService } from './booth.service';
import {
  CreateBoothDTO,
  CreateBoothDtoValidationScheme,
  GetBoothDTO,
  GetBoothDtoValidationScheme,
  GetBoothPaginationDTO,
  GetBoothPaginationDtoValidationScheme,
  PatchBoothDTO,
  PatchBoothDtoValidationScheme,
  PatchBoothParamDTO,
  PatchBoothParamDtoValidationScheme,
} from './dtos-req';

import { jwtMiddleware } from '@commons/middlewares/auth.middleware';
import { JwtPayload } from '@commons/types';
import type { JwtVariables } from 'hono/jwt';

export const BoothRouter = new Hono<{ Variables: JwtVariables }>();

// Get Booths End-point
BoothRouter.get(
  '/',
  validationMiddleware(GetBoothPaginationDtoValidationScheme, 'query'),
  async c => {
    const data = c.req.query();
    const { page, size } = data as unknown as GetBoothPaginationDTO;

    const { count, list } = await BoothService.getBooths(page, size);
    return c.json({
      count,
      list,
    });
  }
);

// Get Booth End-point
BoothRouter.get(
  '/:boothId',
  jwtMiddleware,
  validationMiddleware(GetBoothDtoValidationScheme, 'param'),
  async c => {
    const { boothId } = c.req.valid('param') as GetBoothDTO;

    const booth = await BoothService.getBooth(boothId);
    return c.json(booth);
  }
);

// Create Booth End-point
BoothRouter.post(
  '/',
  // jwtMiddleware,
  validationMiddleware(CreateBoothDtoValidationScheme, 'json'),
  async c => {
    const payload = c.get('jwtPayload') as JwtPayload;
    const { id, fullText } = c.req.valid('json') as CreateBoothDTO;

    const booth = await BoothService.createBooth({
      id,
      requestOwnerAddress: '0xasdfljksdf', // requestOwnerAddress: payload.address,
      fullText,
    });

    return c.json(booth);
  }
);

// Patch Booth End-point
BoothRouter.patch(
  '/:boothId/preview-text',
  jwtMiddleware,
  validationMiddleware(PatchBoothParamDtoValidationScheme, 'param'),
  validationMiddleware(PatchBoothDtoValidationScheme, 'json'),
  async c => {
    const payload = c.get('jwtPayload') as JwtPayload;
    const { boothId } = c.req.valid('param') as PatchBoothParamDTO;
    const { previewText } = c.req.valid('json') as PatchBoothDTO;

    const updatedBooth = await BoothService.patchBooth({
      boothId,
      previewText,
      ownerAddress: payload.address,
    });

    return c.json(updatedBooth);
  }
);
