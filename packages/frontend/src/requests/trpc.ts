import { createTRPCReact } from '@trpc/react-query';
import type { TrpcRouter } from '../../../backend/src/index';

export const trpc = createTRPCReact<TrpcRouter>();
