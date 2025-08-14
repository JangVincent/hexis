CREATE TABLE "booth_sale_text" (
	"id" uuid PRIMARY KEY DEFAULT 'ee445808-d456-4ab9-b0bd-7f93f7bf8010' NOT NULL,
	"booth_id" uuid NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "booths" (
	"id" uuid PRIMARY KEY DEFAULT '2fa4b562-afcd-4042-88a4-96af075ae42b' NOT NULL,
	"owner" varchar(42) NOT NULL,
	"sample_text" text NOT NULL,
	"blockNumber" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "nonces" ALTER COLUMN "walletAddress" SET DATA TYPE varchar(42);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT 'f827e0cf-cb6b-4c6f-8946-69c5c886108c';--> statement-breakpoint
ALTER TABLE "booth_sale_text" ADD CONSTRAINT "booth_sale_text_booth_id_booths_id_fk" FOREIGN KEY ("booth_id") REFERENCES "public"."booths"("id") ON DELETE no action ON UPDATE no action;