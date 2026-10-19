-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "followUpAt" TIMESTAMP(3),
ADD COLUMN     "kind" TEXT NOT NULL DEFAULT 'contact',
ADD COLUMN     "notes" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "page" TEXT,
ADD COLUMN     "plan" TEXT,
ADD COLUMN     "system" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "message" SET DEFAULT '';

-- CreateIndex
CREATE INDEX "ContactMessage_status_createdAt_idx" ON "ContactMessage"("status", "createdAt");

-- Old inbox statuses → the new pipeline
UPDATE "ContactMessage" SET "status" = 'contacted' WHERE "status" = 'replied';
UPDATE "ContactMessage" SET "status" = 'lost' WHERE "status" = 'archived';
