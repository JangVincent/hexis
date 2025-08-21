import { trpcServer } from '@hono/trpc-server';
import {
  getUserFromHeader,
  protectedProcedure,
  publicProcedure,
  router,
} from '@lib/trpc/trpc';
import { AuthRouter } from '@modules/auth/auth.router';
import { BoothRouter } from '@modules/booth/booth.router';
import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// CORS must be applied before route handlers (including tRPC)
app.use(
  '*',
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: [
      'content-type',
      'authorization',
      'x-requested-with',
      'x-trpc-source',
      'x-trpc-caller',
      'x-trpc-batch',
      'x-trpc-procedure',
      'x-trpc-version',
      'trpc-batch-mode',
    ],
  })
);

app.get('/', c => {
  return c.text('Hello Hono!');
});

app.route('/auth', AuthRouter);
app.route('/booths', BoothRouter);

const trpcRouter = router({
  hello: publicProcedure.query(({ ctx }) => {
    return `Hello ${ctx.user.address ?? 'world'}`;
  }),
  protected: protectedProcedure.query(({ ctx }) => {
    return `Hello ${ctx.user.address ?? 'world'}`;
  }),
});

app.use(
  '/trpc/*',
  trpcServer({
    router: trpcRouter,
    createContext: async (opts, c) => {
      return {
        user: await getUserFromHeader(c.req.header('authorization')),
      };
    },
  })
);

export default {
  port: process.env.PORT || 8080,
  fetch: app.fetch,
};
