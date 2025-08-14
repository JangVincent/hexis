CREATE TABLE "booth_sale_text" (
	"id" uuid PRIMARY KEY DEFAULT 'ebb08752-6e34-4f29-bc07-ada84eea500b' NOT NULL,
	"booth_id" uuid NOT NULL,
	"encrypted_text" text NOT NULL,
	"iv" text NOT NULL,
	"auth_tag" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "booths" (
	"id" uuid PRIMARY KEY DEFAULT '5dcdea8e-c305-4180-9f18-3b8901509ab6' NOT NULL,
	"owner" varchar(42) NOT NULL,
	"sample_text" text NOT NULL,
	"blockNumber" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "nonces" ALTER COLUMN "walletAddress" SET DATA TYPE varchar(42);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT '95a55065-155d-4e52-a2fd-a8541690615c';--> statement-breakpoint
ALTER TABLE "booth_sale_text" ADD CONSTRAINT "booth_sale_text_booth_id_booths_id_fk" FOREIGN KEY ("booth_id") REFERENCES "public"."booths"("id") ON DELETE no action ON UPDATE no action;