CREATE TABLE IF NOT EXISTS "button" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text NOT NULL,
	"user_id" integer,
	"linkTree_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkTree" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
