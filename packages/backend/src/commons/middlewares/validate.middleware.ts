import { zValidator } from '@hono/zod-validator';
import { HttpStatusCode } from 'axios';
import { HTTPException } from 'hono/http-exception';
import z from 'zod';

export const validationMiddleware = (
  schema: z.ZodSchema,
  target: 'json' | 'form' | 'query' | 'param'
) => {
  return zValidator(target, schema, (result, c) => {
    if (!result.success) {
      const error = JSON.parse(result['error'].toString());
      if (Array.isArray(error)) {
        throw new HTTPException(HttpStatusCode.BadRequest, {
          message: `${error[0].path.join('.')} - ${error[0].message}`,
        });
      } else {
        throw new HTTPException(HttpStatusCode.BadRequest, {
          message: `${error.path.join('.')} - ${error.message}`,
        });
      }
    }
  });
};
