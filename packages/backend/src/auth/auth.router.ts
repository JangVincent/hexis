import { validationMiddleware } from '@/commons/validate.middleware';
import { HttpStatusCode } from 'axios';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { AuthService } from './auth.service';
import { LoginDTO, LoginDtoValidationScheme } from './dtos-req';

export const AuthRouter = new Hono().basePath('');

// Nonce Generation End-point
AuthRouter.get('/nonce', async c => {
  const address = c.req.query('address');
  if (!address) {
    throw new HTTPException(HttpStatusCode.BadRequest, {
      message: 'Missing required fields: address',
    });
  }

  const nonce = await AuthService.generateNonce(address.toLowerCase());
  return c.json(nonce);
});

// Login End-point
AuthRouter.post(
  '/login',
  validationMiddleware(LoginDtoValidationScheme, 'json'),
  async c => {
    const data = c.req.valid('json');
    const { nonce, signature, address } = data as LoginDTO;

    const response = await AuthService.login({
      nonce,
      signature,
      address: address.toLowerCase(),
    });

    return c.json(response);
  }
);
