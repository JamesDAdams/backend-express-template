-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CharacterListLevel" ADD VALUE 'JLTPT_N1';
ALTER TYPE "CharacterListLevel" ADD VALUE 'JLTPT_N2';
ALTER TYPE "CharacterListLevel" ADD VALUE 'JLTPT_N3';
ALTER TYPE "CharacterListLevel" ADD VALUE 'JLTPT_N4';
ALTER TYPE "CharacterListLevel" ADD VALUE 'JLTPT_N5';
