import { validationMiddleware } from '@/commons/middlewares/validate.middleware';
import { Hono } from 'hono';
import { AuthService } from './auth.service';
import {
  GetNonceDTO,
  LoginDtoValidationScheme,
  NonceDtoValidationScheme,
  PostLoginDTO,
} from './dtos-req';

export const AuthRouter = new Hono();

// Nonce Generation End-point
AuthRouter.get(
  '/nonce',
  validationMiddleware(NonceDtoValidationScheme, 'query'),
  async c => {
    const data = c.req.valid('query');
    const { address } = data as GetNonceDTO;

    const nonce = await AuthService.generateNonce(address.toLowerCase());
    return c.json(nonce);
  }
);

// Login End-point
AuthRouter.post(
  '/login',
  validationMiddleware(LoginDtoValidationScheme, 'json'),
  async c => {
    const data = c.req.valid('json');
    const { nonce, signature, address } = data as PostLoginDTO;

    const response = await AuthService.login({
      nonce,
      signature,
      address: address.toLowerCase(),
    });

    return c.json(response);
  }
);
