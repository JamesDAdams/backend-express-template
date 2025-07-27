-- CreateEnum for CharacterListLevel
CREATE TYPE "CharacterListLevel" AS ENUM ('LEVEL_10', 'LEVEL_9', 'LEVEL_8', 'LEVEL_7', 'LEVEL_6', 'LEVEL_5', 'LEVEL_4', 'LEVEL_3', 'PRE_2', 'LEVEL_2', 'PRE_1', 'LEVEL_1');

-- AlterTable to add level column to character_lists
ALTER TABLE "character_lists" ADD COLUMN "level" "CharacterListLevel";