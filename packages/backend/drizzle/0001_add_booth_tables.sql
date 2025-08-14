CREATE TABLE "booth_sale_text" (
	"id" uuid PRIMARY KEY DEFAULT '7e621d4f-c8fb-43e7-8f78-29d8f4dcdc90' NOT NULL,
	"booth_id" uuid NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "booths" (
	"id" uuid PRIMARY KEY DEFAULT 'db7d387f-6adb-4f37-ac11-688fc5516ba6' NOT NULL,
	"owner" varchar(42) NOT NULL,
	"sample_text" text NOT NULL,
	"blockNumber" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rotate_key" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(256) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "nonces" ALTER COLUMN "walletAddress" SET DATA TYPE varchar(42);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT '78907b93-434f-4489-8f8c-503fb64065a2';--> statement-breakpoint
ALTER TABLE "booth_sale_text" ADD CONSTRAINT "booth_sale_text_booth_id_booths_id_fk" FOREIGN KEY ("booth_id") REFERENCES "public"."booths"("id") ON DELETE no action ON UPDATE no action;