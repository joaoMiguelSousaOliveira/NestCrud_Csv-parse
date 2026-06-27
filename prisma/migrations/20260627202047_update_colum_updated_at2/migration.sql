-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "completed_at" DROP NOT NULL;
