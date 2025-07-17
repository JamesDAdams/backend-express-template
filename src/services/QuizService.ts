import { PrismaClient, Prisma } from '@prisma/client';
import { InternalServerError } from 'routing-controllers';

export class QuizService {
	private readonly prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	/**
	 * Create a new quiz for a user
	 * @param userId - The ID of the user
	 * @param quizData - The quiz data
	 * @returns The created quiz
	 */
	async createQuiz(userId: number, quizData: any) {
		try {
			return await this.prisma.quiz.create({
				data: {
					...quizData,
					userId
				}
			});
		} catch (error) {
			console.error('Error creating quiz:', error);
			throw new InternalServerError('Error creating quiz');
		}
	}

	/**
	 * Get user's quiz list with pagination
	 * @param userId - The ID of the user
	 * @param page - Page number
	 * @param limit - Items per page
	 * @param orderBy - Order by field
	 * @returns Paginated quiz list
	 */
	async getUserQuizzes(userId: number, page: number = 1, limit: number = 10, orderBy: Prisma.SortOrder = 'desc') {
		try {
			const skip = (page - 1) * limit;
			const [quizzes, total] = await Promise.all([
				this.prisma.quiz.findMany({
					where: { userId },
					skip,
					take: limit,
					orderBy: {
						datetime: orderBy
					}
				}),
				this.prisma.quiz.count({
					where: { userId }
				})
			]);

			return {
				quizzes,
				pagination: {
					total,
					page,
					limit,
					totalPages: Math.ceil(total / limit)
				}
			};
		} catch (error) {
			console.error('Error getting user quizzes:', error);
			throw new InternalServerError('Error retrieving quizzes');
		}
	}
}
