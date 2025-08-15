CREATE TABLE "booth_sale_text" (
	"boothId" varchar(100) PRIMARY KEY NOT NULL,
	"encrypted_text" text NOT NULL,
	"iv" text NOT NULL,
	"auth_tag" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "booths" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"owner" varchar(42) NOT NULL,
	"price" varchar(1000) NOT NULL,
	"preview_text" text NOT NULL,
	"boothAddress" varchar(42) NOT NULL,
	"payment_option" "booth_payment_option" NOT NULL,
	"paymentTokenAddress" varchar(42) NOT NULL,
	"sale_type" "booth_sale_type" NOT NULL,
	"is_sale_started" boolean DEFAULT false NOT NULL,
	"blockNumber" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "nonces" ALTER COLUMN "walletAddress" SET DATA TYPE varchar(42);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT 'c3aa9754-214d-4b50-bc1d-c674f93c3894';--> statement-breakpoint
ALTER TABLE "booth_sale_text" ADD CONSTRAINT "booth_sale_text_boothId_booths_id_fk" FOREIGN KEY ("boothId") REFERENCES "public"."booths"("id") ON DELETE no action ON UPDATE no action;