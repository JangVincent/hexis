import { HttpStatusCode } from 'axios';
import { Context, Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { AuthService } from './auth.service';
import { LoginDtoValidationScheme } from './dtos-req';

export const AuthRouter = new Hono().basePath('');

// Nonce Generation End-point
AuthRouter.get('/nonce', async (c: Context) => {
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
AuthRouter.post('/login', async (c: Context) => {
  const raw = await c.req.json();
  const parseResult = LoginDtoValidationScheme.safeParse(raw);

  if (!parseResult.success) {
    throw new HTTPException(HttpStatusCode.BadRequest, {
      message: 'Invalid request body',
    });
  }

  const { nonce, signature, address } = parseResult.data;

  const response = await AuthService.login({
    nonce,
    signature,
    address: address.toLowerCase(),
  });

  return c.json(response);
});
