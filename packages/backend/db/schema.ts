import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').default(crypto.randomUUID()).primaryKey().notNull(),
  walletAddress: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export const noncesTable = pgTable('nonces', {
  nonce: varchar({ length: 255 }).primaryKey().notNull(),
  walletAddress: varchar({ length: 255 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});
export type Nonce = typeof noncesTable.$inferSelect;
export type NewNonce = typeof noncesTable.$inferInsert;
