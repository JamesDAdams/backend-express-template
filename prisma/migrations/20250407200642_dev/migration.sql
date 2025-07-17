-- CreateEnum
CREATE TYPE "QuizType" AS ENUM ('HIRAGANA', 'KATAKANA', 'KANJI', 'VOCABULARY', 'LISTENING');

-- CreateEnum
CREATE TYPE "AnswerFormat" AS ENUM ('ROMAJI', 'KANA', 'WRITING', 'SPEAKING');

-- CreateTable
CREATE TABLE "quizzes" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "QuizType" NOT NULL,
    "onlyKnowKana" BOOLEAN NOT NULL DEFAULT false,
    "onlyUnknowKana" BOOLEAN NOT NULL DEFAULT false,
    "random" BOOLEAN NOT NULL DEFAULT true,
    "numberOfQuestion" INTEGER NOT NULL,
    "answerFormat" "AnswerFormat" NOT NULL,
    "duration" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
