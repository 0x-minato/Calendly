/*
  Warnings:

  - Added the required column `durationMinutes` to the `event_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event_types" ADD COLUMN     "durationMinutes" INTEGER NOT NULL;
