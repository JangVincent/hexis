CREATE TABLE "nonces" (
	"nonce" varchar(255) PRIMARY KEY NOT NULL,
	"walletAddress" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"walletAddress" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_walletAddress_unique" UNIQUE("walletAddress")
);
