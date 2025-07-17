-- CreateTable
CREATE TABLE "kanjis" (
    "id" SERIAL NOT NULL,
    "character" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "translations" TEXT[],

    CONSTRAINT "kanjis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_kanjis" (
    "userId" INTEGER NOT NULL,
    "kanjiId" INTEGER NOT NULL,
    "isLearned" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_kanjis_pkey" PRIMARY KEY ("userId","kanjiId")
);

-- CreateIndex
CREATE UNIQUE INDEX "kanjis_character_key" ON "kanjis"("character");

-- AddForeignKey
ALTER TABLE "user_kanjis" ADD CONSTRAINT "user_kanjis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_kanjis" ADD CONSTRAINT "user_kanjis_kanjiId_fkey" FOREIGN KEY ("kanjiId") REFERENCES "kanjis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
