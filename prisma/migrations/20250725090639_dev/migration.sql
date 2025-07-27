-- CreateEnum
CREATE TYPE "CharacterListStatus" AS ENUM ('PRIVATE', 'PUBLIC', 'FRIENDS_ONLY');

-- AlterTable
ALTER TABLE "character_lists" ADD COLUMN     "status" "CharacterListStatus" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "characters" ALTER COLUMN "translate" SET DEFAULT ARRAY[]::TEXT[];
