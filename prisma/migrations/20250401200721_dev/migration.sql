-- CreateEnum
CREATE TYPE "KanaType" AS ENUM ('HIRAGANA', 'KATAKANA');

-- CreateTable
CREATE TABLE "kanas" (
    "id" SERIAL NOT NULL,
    "character" TEXT NOT NULL,
    "type" "KanaType" NOT NULL,

    CONSTRAINT "kanas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_kanas" (
    "userId" INTEGER NOT NULL,
    "kanaId" INTEGER NOT NULL,
    "isLearned" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_kanas_pkey" PRIMARY KEY ("userId","kanaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "kanas_character_key" ON "kanas"("character");

-- AddForeignKey
ALTER TABLE "user_kanas" ADD CONSTRAINT "user_kanas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_kanas" ADD CONSTRAINT "user_kanas_kanaId_fkey" FOREIGN KEY ("kanaId") REFERENCES "kanas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
