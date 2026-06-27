/*
  Warnings:

  - Made the column `completed_at` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "completed_at" SET NOT NULL;
