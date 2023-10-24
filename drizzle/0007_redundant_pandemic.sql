ALTER TABLE "button" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "button" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "button" ALTER COLUMN "linkTree_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "linkTree" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "linkTree" ALTER COLUMN "id" DROP DEFAULT;