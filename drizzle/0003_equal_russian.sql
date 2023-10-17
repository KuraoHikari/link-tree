ALTER TABLE "linkTree" RENAME COLUMN "text" TO "title";--> statement-breakpoint
ALTER TABLE "button" ADD COLUMN "link" text NOT NULL;--> statement-breakpoint
ALTER TABLE "linkTree" ADD COLUMN "description" text NOT NULL;