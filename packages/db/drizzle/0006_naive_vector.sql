ALTER TABLE "email_verifications" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "email_verifications" ALTER COLUMN "code" SET DATA TYPE varchar(8);