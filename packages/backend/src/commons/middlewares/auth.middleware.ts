import { HttpStatusCode } from 'axios';
import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { jwt } from 'hono/jwt';

export const jwtMiddleware = jwt({
  secret: process.env.ACCESS_TOKEN_SECRET,
});

export const jwtAuth = async (c: Context, next: () => Promise<void>) => {
  const token = c.req.header('Authorization')?.split(' ');

  if (token?.[0] !== 'Bearer') {
    throw new HTTPException(HttpStatusCode.Unauthorized, {
      message: 'Should use Bearer token',
    });
  }

  if (!token?.[1]) {
    throw new HTTPException(HttpStatusCode.Unauthorized, {
      message: 'Token is required',
    });
  }

  return jwtMiddleware(c, next);
};
