import { PrismaClient, CharacterListStatus, CharacterListLevel } from '@prisma/client';
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError } from 'routing-controllers';

export class CharacterListService {
	private readonly prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	/**
	 * Create a new character list for a user
	 * @param userId - The ID of the user creating the list
	 * @param name - The name of the character list
	 * @param status - The visibility status of the character list
	 * @param level - The level of the character list
	 * @returns The created character list
	 */
	async createCharacterList(userId: number, name: string, status?: CharacterListStatus, level?: CharacterListLevel) {
		try {
			const characterList = await this.prisma.characterList.create({
				data: {
					name,
					status: status || CharacterListStatus.PUBLIC,
					// level,
					creatorId: userId
				},
				include: {
					creator: {
						select: {
							id: true,
							name: true,
							avatar: true
						}
					},
					_count: {
						select: {
							characters: true,
							userSubscriptions: true
						}
					}
				}
			});

			// Automatically subscribe the creator to their own list
			await this.prisma.userCharacterListSubscription.create({
				data: {
					userId,
					characterListId: characterList.id
				}
			});

			return characterList;
		} catch (error) {
			console.error('Error creating character list:', error);
			throw new InternalServerError('Error creating character list');
		}
	}

	/**
	 * Update a character list (only creator can edit)
	 * @param listId - The ID of the character list
	 * @param userId - The ID of the user attempting to update
	 * @param name - The new name of the character list
	 * @param status - The new status of the character list
	 * @param level - The new level of the character list
	 * @returns The updated character list
	 */
	async updateCharacterList(listId: number, userId: number, name?: string, status?: CharacterListStatus, level?: CharacterListLevel) {
		try {
			// Check if the user is the creator
			const characterList = await this.prisma.characterList.findUnique({
				where: { id: listId }
			});

			if (!characterList) {
				throw new NotFoundError('Character list not found');
			}

			if (characterList.creatorId !== userId) {
				throw new ForbiddenError('Only the creator can edit this character list');
			}

			const updateData: any = {};
			if (name !== undefined) updateData.name = name;
			if (status !== undefined) updateData.status = status;
			// if (level !== undefined) updateData.level = level;

			return await this.prisma.characterList.update({
				where: { id: listId },
				data: updateData,
				include: {
					creator: {
						select: {
							id: true,
							name: true,
							avatar: true
						}
					},
					_count: {
						select: {
							characters: true,
							userSubscriptions: true
						}
					}
				}
			});
		} catch (error) {
			if (error instanceof NotFoundError || error instanceof ForbiddenError) {
				throw error;
			}
			console.error('Error updating character list:', error);
			throw new InternalServerError('Error updating character list');
		}
	}

	/**
	 * Subscribe a user to a character list
	 * @param userId - The ID of the user
	 * @param characterListId - The ID of the character list
	 * @returns The subscription record
	 */
	async subscribeToCharacterList(userId: number, characterListId: number) {
		try {
			// Check if character list exists
			const characterList = await this.prisma.characterList.findUnique({
				where: { id: characterListId }
			});

			if (!characterList) {
				throw new NotFoundError('Character list not found');
			}

			// Check if already subscribed
			const existingSubscription = await this.prisma.userCharacterListSubscription.findUnique({
				where: {
					userId_characterListId: {
						userId,
						characterListId
					}
				}
			});

			if (existingSubscription) {
				if (existingSubscription.isActive) {
					throw new BadRequestError('Already subscribed to this character list');
				}

				// Reactivate subscription
				return await this.prisma.userCharacterListSubscription.update({
					where: {
						userId_characterListId: {
							userId,
							characterListId
						}
					},
					data: {
						isActive: true,
						subscribedAt: new Date()
					}
				});
			}

			// Create new subscription
			return await this.prisma.userCharacterListSubscription.create({
				data: {
					userId,
					characterListId
				}
			});
		} catch (error) {
			if (error instanceof NotFoundError || error instanceof BadRequestError) {
				throw error;
			}
			console.error('Error subscribing to character list:', error);
			throw new InternalServerError('Error subscribing to character list');
		}
	}

	/**
	 * Unsubscribe a user from a character list
	 * @param userId - The ID of the user
	 * @param characterListId - The ID of the character list
	 * @returns Success message
	 */
	async unsubscribeFromCharacterList(userId: number, characterListId: number) {
		try {
			const subscription = await this.prisma.userCharacterListSubscription.findUnique({
				where: {
					userId_characterListId: {
						userId,
						characterListId
					}
				}
			});

			if (!subscription || !subscription.isActive) {
				throw new BadRequestError('Not subscribed to this character list');
			}

			await this.prisma.userCharacterListSubscription.update({
				where: {
					userId_characterListId: {
						userId,
						characterListId
					}
				},
				data: {
					isActive: false
				}
			});

			return { message: 'Successfully unsubscribed from character list' };
		} catch (error) {
			if (error instanceof BadRequestError) {
				throw error;
			}
			console.error('Error unsubscribing from character list:', error);
			throw new InternalServerError('Error unsubscribing from character list');
		}
	}

	/**
	 * Toggle the progress of a character for a specific user
	 * @param userId - The ID of the user
	 * @param characterListId - The ID of the character list
	 * @param characterId - The ID of the character
	 * @param isKnown - The new known status
	 * @returns The updated UserCharacterProgress record
	 */
	async toggleCharacterProgress(userId: number, characterListId: number, characterId: number, isKnown: boolean) {
		try {
			// Verify user is subscribed to the character list
			const subscription = await this.prisma.userCharacterListSubscription.findUnique({
				where: {
					userId_characterListId: {
						userId,
						characterListId
					}
				}
			});

			if (!subscription || !subscription.isActive) {
				throw new ForbiddenError('You must be subscribed to this character list');
			}

			// Verify the character belongs to the list
			const character = await this.prisma.character.findFirst({
				where: {
					id: characterId,
					characterListId
				}
			});

			if (!character) {
				throw new NotFoundError('Character not found in this list');
			}

			// Check if progress record exists
			const existingProgress = await this.prisma.userCharacterProgress.findUnique({
				where: {
					userId_characterId: {
						userId,
						characterId
					}
				}
			});

			if (!existingProgress) {
				// Create new progress record
				return await this.prisma.userCharacterProgress.create({
					data: {
						userId,
						characterId,
						isKnown
					}
				});
			}

			// Update existing progress
			return await this.prisma.userCharacterProgress.update({
				where: {
					userId_characterId: {
						userId,
						characterId
					}
				},
				data: {
					isKnown,
					updatedAt: new Date()
				}
			});
		} catch (error) {
			if (error instanceof ForbiddenError || error instanceof NotFoundError) {
				throw error;
			}
			console.error('Error toggling character progress:', error);
			throw new InternalServerError('Error updating character progress');
		}
	}

	/**
	 * Bulk update progress for all characters in a list
	 * @param userId - The ID of the user
	 * @param characterListId - The ID of the character list
	 * @param isKnown - The new known status for all characters
	 * @returns Summary of updated characters
	 */
	async bulkUpdateCharacterProgress(userId: number, characterListId: number, isKnown: boolean) {
		try {
			// Verify user is subscribed to the character list
			const subscription = await this.prisma.userCharacterListSubscription.findUnique({
				where: {
					userId_characterListId: {
						userId,
						characterListId
					}
				}
			});

			if (!subscription || !subscription.isActive) {
				throw new ForbiddenError('You must be subscribed to this character list');
			}

			// Get all characters in the list
			const characters = await this.prisma.character.findMany({
				where: {
					characterListId
				},
				select: {
					id: true
				}
			});

			if (characters.length === 0) {
				throw new BadRequestError('No characters found in this list');
			}

			const characterIds = characters.map(char => char.id);

			// Use transaction for bulk update
			const result = await this.prisma.$transaction(async (tx) => {
				// Get existing progress records
				const existingProgress = await tx.userCharacterProgress.findMany({
					where: {
						userId,
						characterId: {
							in: characterIds
						}
					}
				});

				const existingCharacterIds = existingProgress.map(progress => progress.characterId);
				const newCharacterIds = characterIds.filter(id => !existingCharacterIds.includes(id));

				// Update existing records
				if (existingCharacterIds.length > 0) {
					await tx.userCharacterProgress.updateMany({
						where: {
							userId,
							characterId: {
								in: existingCharacterIds
							}
						},
						data: {
							isKnown,
							updatedAt: new Date()
						}
					});
				}

				// Create new records
				if (newCharacterIds.length > 0) {
					await tx.userCharacterProgress.createMany({
						data: newCharacterIds.map(characterId => ({
							userId,
							characterId,
							isKnown
						}))
					});
				}

				return {
					updated: existingCharacterIds.length,
					created: newCharacterIds.length,
					total: characterIds.length
				};
			});

			return {
				message: `Successfully updated progress for ${result.total} characters`,
				details: result
			};
		} catch (error) {
			if (error instanceof ForbiddenError || error instanceof BadRequestError) {
				throw error;
			}
			console.error('Error bulk updating character progress:', error);
			throw new InternalServerError('Error updating character progress');
		}
	}

	/**
	 * Add multiple characters to a character list
	 * @param listId - The ID of the character list
	 * @param userId - The ID of the user attempting to add characters
	 * @param characters - Array of character data to add
	 * @returns Summary of added characters
	 */
	async addCharactersToList(listId: number, userId: number, characters: any[]) {
		try {
			// Check if character list exists and user is the creator
			const characterList = await this.prisma.characterList.findUnique({
				where: { id: listId }
			});

			if (!characterList) {
				throw new NotFoundError('Character list not found');
			}

			if (characterList.creatorId !== userId) {
				throw new ForbiddenError('Only the creator can add characters to this list');
			}

			// Validate characters data
			if (!characters || characters.length === 0) {
				throw new BadRequestError('No characters provided');
			}

			// Use transaction to add all characters
			const result = await this.prisma.$transaction(async (tx) => {
				const createdCharacters = [];

				for (const characterData of characters) {
					// Check if character with same char already exists in this list
					const existingCharacter = await tx.character.findFirst({
						where: {
							char: characterData.char,
							characterListId: listId
						}
					});

					if (!existingCharacter) {
						const newCharacter = await tx.character.create({
							data: {
								char: characterData.char,
								romaji: characterData.romaji,
								groupe: characterData.groupe,
								svg_id: characterData.svg_id,
								alternative_characters: characterData.alternative_characters,
								tenten: characterData.tenten,
								maru: characterData.maru,
								dakuon: characterData.dakuon,
								translate: characterData.translate,
								kana: characterData.kana,
								characterListId: listId
							}
						});
						createdCharacters.push(newCharacter);
					}
				}

				return {
					added: createdCharacters.length,
					skipped: characters.length - createdCharacters.length,
					total: characters.length,
					characters: createdCharacters
				};
			});

			return {
				message: `Successfully added ${result.added} characters to the list`,
				details: result
			};
		} catch (error) {
			if (error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof BadRequestError) {
				throw error;
			}
			console.error('Error adding characters to list:', error);
			throw new InternalServerError('Error adding characters to list');
		}
	}

	/**
	 * Get all characters from a character list with user progress
	 * @param userId - The ID of the user
	 * @param characterListId - The ID of the character list
	 * @returns All characters with user progress information and complete list metadata
	 */
	async getCharactersFromList(userId: number, characterListId: number) {
		try {
			// Check if character list exists and get complete metadata
			const characterList = await this.prisma.characterList.findUnique({
				where: { id: characterListId },
				include: {
					creator: {
						select: {
							id: true,
							name: true,
							avatar: true
						}
					},
					_count: {
						select: {
							characters: true,
							userSubscriptions: {
								where: {
									isActive: true
								}
							}
						}
					},
					userSubscriptions: {
						where: {
							userId,
							isActive: true
						},
						select: {
							subscribedAt: true
						}
					}
				}
			});

			if (!characterList) {
				throw new NotFoundError('Character list not found');
			}

			// Check if user has access to this list
			if (characterList.status === CharacterListStatus.PRIVATE && characterList.creatorId !== userId) {
				throw new ForbiddenError('Access denied to this character list');
			}

			// Get all characters with user progress
			const characters = await this.prisma.character.findMany({
				where: {
					characterListId
				},
				include: {
					userCharacterProgress: {
						where: {
							userId
						}
					}
				},
				orderBy: {
					id: 'asc'
				}
			});

			// Format the characters
			const formattedCharacters = characters.map(character => ({
				id: character.id,
				char: character.char,
				romaji: character.romaji,
				groupe: character.groupe,
				svg_id: character.svg_id,
				alternative_characters: character.alternative_characters,
				tenten: character.tenten,
				maru: character.maru,
				dakuon: character.dakuon,
				translate: character.translate,
				kana: character.kana,
				isKnown: character.userCharacterProgress.length > 0 ? character.userCharacterProgress[0].isKnown : false,
				lastUpdated: character.userCharacterProgress.length > 0 ? character.userCharacterProgress[0].updatedAt : null
			}));

			// Return complete response with list metadata and characters
			return {
				id: characterList.id,
				name: characterList.name,
				status: characterList.status,
				level: characterList.level,
				desription: characterList.description,
				createdAt: characterList.createdAt,
				creator: characterList.creator,
				charactersCount: characterList._count.characters,
				subscribersCount: characterList._count.userSubscriptions,
				isSubscribed: characterList.userSubscriptions.length > 0,
				subscribedAt: characterList.userSubscriptions.length > 0 ? characterList.userSubscriptions[0].subscribedAt : null,
				isOwner: characterList.creatorId === userId,
				characters: formattedCharacters,
				totalCount: characters.length
			};
		} catch (error) {
			if (error instanceof NotFoundError || error instanceof ForbiddenError) {
				throw error;
			}
			console.error('Error getting characters from list:', error);
			throw new InternalServerError('Error retrieving characters');
		}
	}

	/**
	 * Search character lists with pagination and filters
	 * @param userId - The ID of the user making the search
	 * @param searchTerm - Search term for list name
	 * @param status - Filter by status
	 * @param level - Filter by level
	 * @param creatorId - Filter by creator ID
	 * @param page - Page number for pagination
	 * @param limit - Number of items per page
	 * @returns Paginated search results
	 */
	async searchCharacterLists(
		userId: number,
		searchTerm?: string,
		status?: CharacterListStatus,
		level?: CharacterListLevel,
		creatorId?: number,
		page: number = 1,
		limit: number = 20
	) {
		try {
			const skip = (page - 1) * limit;

			// Build where clause
			const whereClause: any = {
				AND: []
			};

			// Add search term filter
			if (searchTerm) {
				whereClause.AND.push({
					name: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				});
			}

			// Add status filter
			if (status) {
				whereClause.AND.push({
					status
				});
			}

			// Add level filter
			// if (level) {
			// 	whereClause.AND.push({
			// 		level
			// 	});
			// }

			// Add creator filter
			if (creatorId) {
				whereClause.AND.push({
					creatorId
				});
			}

			// Filter out private lists that don't belong to the user
			whereClause.AND.push({
				OR: [
					{
						status: {
							not: CharacterListStatus.PRIVATE
						}
					},
					{
						creatorId: userId
					}
				]
			});

			// Get character lists
			const characterLists = await this.prisma.characterList.findMany({
				where: whereClause,
				include: {
					creator: {
						select: {
							id: true,
							name: true,
							avatar: true
						}
					},
					_count: {
						select: {
							characters: true,
							userSubscriptions: {
								where: {
									isActive: true
								}
							}
						}
					},
					userSubscriptions: {
						where: {
							userId,
							isActive: true
						},
						select: {
							subscribedAt: true
						}
					}
				},
				skip,
				take: limit,
				orderBy: {
					createdAt: 'desc'
				}
			});

			// Get total count for pagination
			const totalCount = await this.prisma.characterList.count({
				where: whereClause
			});

			// Format the response
			const formattedLists = characterLists.map(list => ({
				id: list.id,
				name: list.name,
				status: list.status,
				// level: list.level,
				createdAt: list.createdAt,
				creator: list.creator,
				charactersCount: list._count.characters,
				subscribersCount: list._count.userSubscriptions,
				isSubscribed: list.userSubscriptions.length > 0,
				subscribedAt: list.userSubscriptions.length > 0 ? list.userSubscriptions[0].subscribedAt : null,
				isOwner: list.creatorId === userId
			}));

			return {
				characterLists: formattedLists,
				pagination: {
					currentPage: page,
					totalPages: Math.ceil(totalCount / limit),
					totalItems: totalCount,
					itemsPerPage: limit,
					hasNextPage: page < Math.ceil(totalCount / limit),
					hasPreviousPage: page > 1
				},
				filters: {
					searchTerm,
					status,
					level,
					creatorId
				}
			};
		} catch (error) {
			console.error('Error searching character lists:', error);
			throw new InternalServerError('Error searching character lists');
		}
	}

	/**
	 * Get all character lists that a user is subscribed to
	 * @param userId - The ID of the user
	 * @returns Character lists with subscription information
	 */
	async getUserSubscribedLists(userId: number) {
		try {
			const subscriptions = await this.prisma.userCharacterListSubscription.findMany({
				where: {
					userId,
					isActive: true
				},
				include: {
					characterList: {
						include: {
							creator: {
								select: {
									id: true,
									name: true,
									avatar: true
								}
							},
							_count: {
								select: {
									characters: true,
									userSubscriptions: {
										where: {
											isActive: true
										}
									}
								}
							}
						}
					}
				},
				orderBy: {
					subscribedAt: 'desc'
				}
			});

			// Format the response
			const formattedLists = subscriptions.map(subscription => ({
				id: subscription.characterList.id,
				name: subscription.characterList.name,
				status: subscription.characterList.status,
				// level: subscription.characterList.level,
				createdAt: subscription.characterList.createdAt,
				creator: subscription.characterList.creator,
				charactersCount: subscription.characterList._count.characters,
				subscribersCount: subscription.characterList._count.userSubscriptions,
				subscribedAt: subscription.subscribedAt,
				isOwner: subscription.characterList.creatorId === userId
			}));

			return {
				characterLists: formattedLists,
				totalCount: formattedLists.length
			};
		} catch (error) {
			console.error('Error getting user subscribed lists:', error);
			throw new InternalServerError('Error retrieving subscribed character lists');
		}
	}

	/**
	 * Get a specific character list by ID
	 * @param userId - The ID of the user requesting the list
	 * @param listId - The ID of the character list
	 * @returns The character list with metadata
	 */
	async getCharacterListById(userId: number, listId: number) {
		try {
			const characterList = await this.prisma.characterList.findUnique({
				where: { id: listId },
				include: {
					creator: {
						select: {
							id: true,
							name: true,
							avatar: true
						}
					},
					_count: {
						select: {
							characters: true,
							userSubscriptions: {
								where: {
									isActive: true
								}
							}
						}
					},
					userSubscriptions: {
						where: {
							userId,
							isActive: true
						},
						select: {
							subscribedAt: true
						}
					}
				}
			});

			if (!characterList) {
				throw new NotFoundError('Character list not found');
			}

			// Check if user has access to this list
			if (characterList.status === CharacterListStatus.PRIVATE && characterList.creatorId !== userId) {
				throw new ForbiddenError('Access denied to this character list');
			}

			// Format the response
			return {
				id: characterList.id,
				name: characterList.name,
				status: characterList.status,
				// level: characterList.level,
				createdAt: characterList.createdAt,
				creator: characterList.creator,
				charactersCount: characterList._count.characters,
				subscribersCount: characterList._count.userSubscriptions,
				isSubscribed: characterList.userSubscriptions.length > 0,
				subscribedAt: characterList.userSubscriptions.length > 0 ? characterList.userSubscriptions[0].subscribedAt : null,
				isOwner: characterList.creatorId === userId
			};
		} catch (error) {
			if (error instanceof NotFoundError || error instanceof ForbiddenError) {
				throw error;
			}
			console.error('Error getting character list:', error);
			throw new InternalServerError('Error retrieving character list');
		}
	}
}