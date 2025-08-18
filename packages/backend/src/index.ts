import { BoothRouter } from '@modules/booth/booth.router';
import 'dotenv/config';
import { Hono } from 'hono';
import { AuthRouter } from './modules/auth/auth.router';
import { SandBoxRouter } from './sandbox/sandbox.router';

const app = new Hono();

app.get('/', c => {
  return c.text('Hello Hono!');
});

app.route('/auth', AuthRouter);
app.route('/booths', BoothRouter);

if (process.env.NODE_ENV === 'DEV') {
  app.route('/sandbox', SandBoxRouter);
}

export default {
  port: process.env.PORT || 8080,
  fetch: app.fetch,
};
