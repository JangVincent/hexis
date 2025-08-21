import { JwtPayload } from '@commons/types';
import { validateJWT } from '@commons/utils/validateJWT';
import { TRPCError, initTRPC } from '@trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { Context, MiddlewareHandler } from 'hono';
import { tRPCOptions } from './types';

export type TrpcContext = Context & {
  user: JwtPayload | null;
};

async function getUserFromHeader(authorization: string | null | undefined) {
  if (authorization) {
    const scheme = authorization.split(' ')[0];
    const token = authorization.split(' ')[1];
    if (scheme !== 'Bearer' || !token) return null;
    try {
      const user = (await validateJWT(token)) as JwtPayload;
      return user;
    } catch (err) {
      return null;
    }
  }
  return null;
}

export const trpcServer = ({
  endpoint = '/trpc',
  createContext,
  ...rest
}: tRPCOptions): MiddlewareHandler => {
  const bodyProps = new Set([
    'arrayBuffer',
    'blob',
    'formData',
    'json',
    'text',
  ] as const);
  type BodyProp = typeof bodyProps extends Set<infer T> ? T : never;
  return async c => {
    const canWithBody = c.req.method === 'GET' || c.req.method === 'HEAD';
    const res = fetchRequestHandler({
      ...rest,
      createContext: async opts => ({
        ...(createContext ? await createContext(opts, c) : {}),
        user: await getUserFromHeader(c.req.header('authorization')),
      }),
      endpoint,
      req: canWithBody
        ? c.req.raw
        : new Proxy(c.req.raw, {
            get(t, p, _r) {
              if (bodyProps.has(p as BodyProp)) {
                return () => c.req[p as BodyProp]();
              }
              return Reflect.get(t, p, t);
            },
          }),
    }).then(res => c.body(res.body, res));
    return res;
  };
};

export const trpc = initTRPC.context<TrpcContext>().create();

export const router = trpc.router;

export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(opts => {
  const { ctx } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next({
    ctx,
  });
});
