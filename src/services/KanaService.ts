import { PrismaClient } from '@prisma/client';
import { BadRequestError, InternalServerError, NotFoundError } from 'routing-controllers';

export class KanaService {
	private readonly prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	/**
	 * Toggle the learned status of a kana for a specific user
	 * @param userId - The ID of the user
	 * @param character - The kana character
	 * @param isLearned - The new learned status
	 * @returns The updated UserKana record
	 */
	async toggleKanaLearned(userId: number, character: string, isLearned: boolean) {
		try {
			// Find the kana by character
			const kana = await this.prisma.kana.findUnique({
				where: { character }
			});

			if (!kana) {
				throw new NotFoundError('Kana not found');
			}

			// Check if the UserKana relation exists
			const userKana = await this.prisma.userKana.findUnique({
				where: {
					userId_kanaId: {
						userId,
						kanaId: kana.id
					}
				}
			});

			if (!userKana) {
				// If the relation doesn't exist, create it
				return await this.prisma.userKana.create({
					data: {
						userId,
						kanaId: kana.id,
						isLearned
					}
				});
			}

			// Update existing relation
			return await this.prisma.userKana.update({
				where: {
					userId_kanaId: {
						userId,
						kanaId: kana.id
					}
				},
				data: {
					isLearned,
					updatedAt: new Date()
				}
			});
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw error;
			}
			console.error('Error toggling kana learned status:', error);
			throw new InternalServerError('Error updating kana learned status');
		}
	}
}
