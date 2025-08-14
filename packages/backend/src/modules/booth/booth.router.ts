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
} from './dtos-req';

export const BoothRouter = new Hono();

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
  async c => {
    const { owner, sampleText, blockNumber, fullText } = c.req.valid(
      'json'
    ) as CreateBoothDTO;

    const booth = await BoothService.createBooth({
      owner,
      sampleText,
      blockNumber,
      fullText,
    });

    return c.json(booth);
  }
);
