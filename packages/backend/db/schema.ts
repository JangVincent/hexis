import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

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
export const BoothPaymentOptionEnum = pgEnum('booth_payment_option', [
  'NATIVE_CURRENCY',
  'ERC20_TOKEN',
]);
export const BoothSaleTypeEnum = pgEnum('booth_sale_type', [
  'INSTANT_SALE',
  'REQUEST_SALE',
]);

export const boothTable = pgTable('booths', {
  id: varchar({ length: 100 }).primaryKey().notNull(),
  owner: varchar({ length: 42 }).notNull(),
  price: varchar({ length: 1000 }).notNull(),
  previewText: text('preview_text').notNull(),

  boothAddress: varchar({ length: 42 }).notNull(),

  paymentOption: BoothPaymentOptionEnum('payment_option').notNull(),
  paymentTokenAddress: varchar({ length: 42 }).notNull(),

  saleType: BoothSaleTypeEnum('sale_type').notNull(),
  isSaleStarted: boolean('is_sale_started').notNull().default(false),

  blockNumber: varchar({ length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
export type Booth = typeof boothTable.$inferSelect;
export type NewBooth = typeof boothTable.$inferInsert;

export const boothSaleTextTable = pgTable('booth_sale_text', {
  boothId: varchar({ length: 100 })
    .primaryKey()
    .notNull()
    .references(() => boothTable.id),
  encryptedText: text('encrypted_text').notNull(),
  iv: text('iv').notNull(),
  authTag: text('auth_tag').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
export type BoothSaleText = typeof boothSaleTextTable.$inferSelect;
export type NewBoothSaleText = typeof boothSaleTextTable.$inferInsert;
