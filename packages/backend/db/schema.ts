import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').default(crypto.randomUUID()).primaryKey().notNull(),
  walletAddress: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export const noncesTable = pgTable('nonces', {
  nonce: varchar({ length: 255 }).primaryKey().notNull(),
  walletAddress: varchar({ length: 42 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});
export type Nonce = typeof noncesTable.$inferSelect;
export type NewNonce = typeof noncesTable.$inferInsert;

// Booth
export const boothTable = pgTable('booths', {
  id: uuid('id').default(crypto.randomUUID()).primaryKey().notNull(),
  owner: varchar({ length: 42 }).notNull(), //wallet address
  sampleText: text('sample_text').notNull(),
  blockNumber: varchar({ length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
export type Booth = typeof boothTable.$inferSelect;
export type NewBooth = typeof boothTable.$inferInsert;

export const boothSaleTextTable = pgTable('booth_sale_text', {
  id: uuid('id').default(crypto.randomUUID()).primaryKey().notNull(),
  boothId: uuid('booth_id')
    .notNull()
    .references(() => boothTable.id),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
export type BoothSaleText = typeof boothSaleTextTable.$inferSelect;
export type NewBoothSaleText = typeof boothSaleTextTable.$inferInsert;
