ALTER TABLE "attendance" ALTER COLUMN "participant_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "certificates" ALTER COLUMN "participant_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "competitions" ADD COLUMN "is_result_declared" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "competitions" ADD COLUMN "are_certificates_issued" boolean DEFAULT false NOT NULL;