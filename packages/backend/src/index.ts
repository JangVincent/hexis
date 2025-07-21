import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

export type Bindings = {
  ENVIRONMENT: "development" | "production";
  MY_VAR: string;
};

const app = new Hono<{
  Bindings: Bindings;
}>();

app.use(logger());

app.use("*", cors());

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.get("/health", (c) => {
  console.log(c.env.MY_VAR);
  return c.json({ status: "ok", env: c.env, v: 1 });
});

export default app;
