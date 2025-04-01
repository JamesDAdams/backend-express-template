import { PrismaClient, type User, FriendshipStatus } from '@prisma/client';
import { log } from 'console';
import { InternalServerError, BadRequestError } from 'routing-controllers';

export class FriendService {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

	async sendFriendRequest(requesterId: number, receiverId: number) {
		try {
			if (requesterId === receiverId) {
				throw new BadRequestError("Vous ne pouvez pas vous ajouter vous-même");
			}

			const existingRequest = await this.prisma.friendship.findUnique({
				where: {
					requesterId_receiverId: {
						requesterId,
						receiverId,
					},
				},
			});

			if (existingRequest) {
				throw new BadRequestError("Une demande d'ami existe déjà");
			}

			return await this.prisma.friendship.create({
				data: {
					requesterId,
					receiverId,
					status: FriendshipStatus.PENDING,
				},
			});
		} catch (error) {
			throw new InternalServerError(`Erreur: ${error}`);
		}
	}

	async updateFriendRequest(requestId: number, userId: number, status: FriendshipStatus) {
		try {
			const friendship = await this.prisma.friendship.findFirst({
				where: {
					OR: [
						{
							AND: [
								{ requesterId: requestId },
								{ receiverId: userId }
							]
						},
						{
							AND: [
								{ requesterId: userId },
								{ receiverId: requestId }
							]
						}
					]
				},
			});

			if (!friendship) {
				throw new BadRequestError("Demande d'ami non trouvée");
			}

			// Only receiver can accept the request
			if (status === FriendshipStatus.ACCEPTED && friendship.requesterId === userId) {
				throw new BadRequestError("Seul le destinataire peut accepter la demande");
			}

			// If rejected, delete the friendship request
			if (status === FriendshipStatus.REJECTED && friendship.requesterId === userId) {
				return await this.prisma.friendship.delete({
					where: { id: friendship.id }
				});
			} else {
				return await this.prisma.friendship.update({
					where: { id: friendship.id },
					data: { status },
				});
			}

		} catch (error) {
			if (error instanceof BadRequestError) {
				throw error;
			}
			throw new InternalServerError(`Erreur lors de la mise à jour de la demande d'ami: ${error}`);
		}
	}

	async getFriendsList(userId: number) {
		try {
			const friends = await this.prisma.friendship.findMany({
				where: {
					OR: [
						{ requesterId: userId },
						{ receiverId: userId },
					],
					status: FriendshipStatus.ACCEPTED,
				},
				include: {
					requester: {
						select: {
							id: true,
							name: true,
							avatar: true,
							level: true,
							status: true,
							lastSeen: true,
							userRoles: true
						},
					},
					receiver: {
						select: {
							id: true,
							name: true,
							avatar: true,
							level: true,
							status: true,
							lastSeen: true,
							userRoles: true
						},
					},
				},
			});

			return friends.map(friendship => ({
				...(friendship.requesterId === userId
					? friendship.receiver
					: friendship.requester),
				requestDate: friendship.createdAt
			}));
		} catch (error) {
			throw new InternalServerError(`Error: ${error}`);
		}
	}

	/**
	 * Get all pending friend requests sent by the user
	 * @param userId The ID of the user
	 * @returns Array of pending friend requests with receiver information
	 */
	async getPendingFriendRequests(userId: number) {
		try {
			const requests = await this.prisma.friendship.findMany({
				where: {
					requesterId: userId,
					status: FriendshipStatus.PENDING,
				},
				select: {
					createdAt: true,
					receiver: {
						select: {
							id: true,
							name: true,
							avatar: true,
							level: true,
							userRoles: true
						},
					},
				},
			});

			return requests.map(request => ({
				...request.receiver,
				requestDate: request.createdAt
			}));
		} catch (error) {
			throw new InternalServerError(`Error: ${error}`);
		}
	}

	/**
	 * Get all pending friend requests received by the user
	 * @param userId The ID of the user
	 * @returns Array of pending friend requests with requester information
	 */
	async getReceivedFriendRequests(userId: number) {
		try {
			const requests = await this.prisma.friendship.findMany({
				where: {
					receiverId: userId,
					status: FriendshipStatus.PENDING,
				},
				select: {
					createdAt: true,
					requester: {
						select: {
							id: true,
							name: true,
							avatar: true,
							level: true,
							userRoles: true
						},
					},
				},
			});

			return requests.map(request => ({
				...request.requester,
				requestDate: request.createdAt
			}));
		} catch (error) {
			throw new InternalServerError(`Error: ${error}`);
		}
	}
}
