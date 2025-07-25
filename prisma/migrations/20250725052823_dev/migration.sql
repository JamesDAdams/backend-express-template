-- CreateTable
CREATE TABLE "character_lists" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "character_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" SERIAL NOT NULL,
    "char" VARCHAR(100) NOT NULL,
    "romaji" VARCHAR(50) NOT NULL,
    "groupe" INTEGER,
    "svg_id" INTEGER[],
    "alternative_characters" VARCHAR(100),
    "tenten" BOOLEAN,
    "maru" BOOLEAN,
    "dakuon" BOOLEAN,
    "translate" TEXT[],
    "kana" VARCHAR(100),
    "characterListId" INTEGER NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_character_progress" (
    "userId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "isKnown" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_character_progress_pkey" PRIMARY KEY ("userId","characterId")
);

-- CreateTable
CREATE TABLE "user_character_list_subscriptions" (
    "userId" INTEGER NOT NULL,
    "characterListId" INTEGER NOT NULL,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_character_list_subscriptions_pkey" PRIMARY KEY ("userId","characterListId")
);

-- AddForeignKey
ALTER TABLE "character_lists" ADD CONSTRAINT "character_lists_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_characterListId_fkey" FOREIGN KEY ("characterListId") REFERENCES "character_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_character_progress" ADD CONSTRAINT "user_character_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_character_progress" ADD CONSTRAINT "user_character_progress_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_character_list_subscriptions" ADD CONSTRAINT "user_character_list_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_character_list_subscriptions" ADD CONSTRAINT "user_character_list_subscriptions_characterListId_fkey" FOREIGN KEY ("characterListId") REFERENCES "character_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
