import {
  generateAccessToken,
  JwtPeriodStringValue,
} from '@commons/utils/generateAccessToken';
import { Hono } from 'hono';

export const SandBoxRouter = new Hono();

SandBoxRouter.post('/login', async c => {
  const body = await c.req.json();
  console.log(body);

  const token = generateAccessToken(
    body.address,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRES_IN as JwtPeriodStringValue
  );

  return c.json({
    token,
  });
});
