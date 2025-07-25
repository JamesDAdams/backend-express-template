-- DropForeignKey
ALTER TABLE "character_lists" DROP CONSTRAINT "character_lists_creatorId_fkey";

-- AlterTable
ALTER TABLE "character_lists" ALTER COLUMN "creatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "character_lists" ADD CONSTRAINT "character_lists_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
