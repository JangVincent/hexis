import { BoothRouter } from '@modules/booth/booth.router';
import 'dotenv/config';
import { Hono } from 'hono';
import { AuthRouter } from './modules/auth/auth.router';

const app = new Hono();

app.get('/', c => {
  return c.text('Hello Hono!');
});

app.route('/auth', AuthRouter);
app.route('/booths', BoothRouter);

export default {
  port: process.env.PORT || 8080,
  fetch: app.fetch,
};
