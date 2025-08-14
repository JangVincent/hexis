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

import { JwtPayload } from '@commons/types';
import { HttpStatusCode } from 'axios';
import { HTTPException } from 'hono/http-exception';
import type { JwtVariables } from 'hono/jwt';
import { jwt } from 'hono/jwt';

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
  validationMiddleware(CreateBoothDtoValidationScheme, 'json'),
  jwt({
    secret: process.env.JWT_SECRET,
  }),
  async c => {
    const payload = c.get('jwtPayload') as JwtPayload;
    const { owner, sampleText, blockNumber, fullText } = c.req.valid(
      'json'
    ) as CreateBoothDTO;

    if (payload.address !== owner) {
      throw new HTTPException(HttpStatusCode.Forbidden);
    }

    const booth = await BoothService.createBooth({
      owner,
      sampleText,
      blockNumber,
      fullText,
    });

    return c.json(booth);
  }
);

// Patch Booth End-point
BoothRouter.patch(
  '/:boothId',
  validationMiddleware(PatchBoothParamDtoValidationScheme, 'param'),
  validationMiddleware(PatchBoothDtoValidationScheme, 'json'),
  jwt({
    secret: process.env.JWT_SECRET,
  }),
  async c => {
    const payload = c.get('jwtPayload') as JwtPayload;
    const { boothId } = c.req.valid('param') as PatchBoothParamDTO;
    const { sampleText } = c.req.valid('json') as PatchBoothDTO;

    const updatedBooth = await BoothService.patchBooth({
      boothId,
      sampleText,
      ownerAddress: payload.address,
    });

    return c.json(updatedBooth);
  }
);
