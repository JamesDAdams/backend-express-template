/*
  Warnings:

  - You are about to drop the `kanjis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_kanjis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_kanjis" DROP CONSTRAINT "user_kanjis_kanjiId_fkey";

-- DropForeignKey
ALTER TABLE "user_kanjis" DROP CONSTRAINT "user_kanjis_userId_fkey";

-- DropTable
DROP TABLE "kanjis";

-- DropTable
DROP TABLE "user_kanjis";
