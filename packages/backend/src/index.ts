import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

export type Bindings = {
  ENVIRONMENT: string;
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
  return c.json({ status: "ok" });
});

export default app;
