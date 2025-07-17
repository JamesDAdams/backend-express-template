import { IsNumber, IsOptional, IsString, Min, Max, IsEnum } from 'class-validator';
import { QuizType, AnswerFormat } from '@prisma/client';

export class CreateQuizDto {
	@IsEnum(QuizType)
	type: QuizType;

	onlyKnowKana: boolean;

	onlyUnknowKana: boolean;

	random: boolean;

	@IsNumber()
	@Min(1)
	numberOfQuestion: number;

	@IsEnum(AnswerFormat)
	answerFormat: AnswerFormat;

	@IsNumber()
	@Min(1)
	duration: number;

	@IsNumber()
	score: number;
}

export class PaginationQueryDto {
	@IsOptional()
	@IsNumber()
	@Min(1)
	page?: number = 1;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(100)
	limit?: number = 10;

	@IsOptional()
	@IsString()
	@IsEnum(['asc', 'desc'])
	orderBy?: 'asc' | 'desc' = 'desc';
}
