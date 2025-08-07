import { HttpStatusCode } from 'axios';
import { Context, Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { AuthService } from './auth.service';

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
  const body = await c.req.json();
  const { nonce, signature, address } = body;

  // TODO : zod
  if (!nonce || !signature || !address) {
    return c.json(
      {
        success: false,
        error: 'Missing required fields: nonce, signature, address',
      },
      400
    );
  }

  const result = await AuthService.login({
    nonce,
    signature,
    address: address.toLowerCase(),
  });

  return c.json(result);
});
