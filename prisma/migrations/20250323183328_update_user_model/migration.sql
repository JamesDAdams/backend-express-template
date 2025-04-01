/*
  Warnings:

  - You are about to drop the column `emailVerifier` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerifier",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "avatar" SET DEFAULT '',
ALTER COLUMN "avatar" SET DATA TYPE VARCHAR(200);
