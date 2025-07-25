import { JsonController, Post, Put, Get, Body, Authorized, Req, Param, QueryParams } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CharacterListService } from '../services/CharacterListService';
import { AuthenticatedRequest } from '../interfaces/AuthInterface';
import { CreateCharacterListDto, UpdateCharacterListDto, ToggleCharacterProgressDto, BulkUpdateCharacterProgressDto, AddCharactersDto, SearchCharacterListsQueryDto } from '../dtos/CharacterListDto';
import { CharacterListStatus } from '@prisma/client';

@JsonController('/character-lists')
export class CharacterListController {
	private readonly characterListService: CharacterListService;

	constructor() {
		this.characterListService = new CharacterListService();
	}

	@Post('/')
	@Authorized()
	@OpenAPI({
		summary: 'Create a new character list',
		description: 'Create a new character list for the authenticated user',
		requestBody: {
			content: {
				'application/json': {
					schema: {
						properties: {
							name: {
								type: 'string',
								description: 'The name of the character list',
							},
							status: {
								type: 'string',
								enum: Object.values(CharacterListStatus),
								description: 'The visibility status of the character list',
							},
						},
					},
				},
			},
		},
	})
	async createCharacterList(@Body() data: CreateCharacterListDto, @Req() request: AuthenticatedRequest) {
		return this.characterListService.createCharacterList(request.user.id, data.name, data.status);
	}

	@Put('/:id')
	@Authorized()
	@OpenAPI({
		summary: 'Update a character list',
		description: 'Update the name and/or status of a character list (only creator can edit)',
		parameters: [
			{
				name: 'id',
				in: 'path',
				required: true,
				schema: { type: 'integer' },
				description: 'The ID of the character list',
			},
		],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						properties: {
							name: {
								type: 'string',
								description: 'The new name of the character list',
							},
							status: {
								type: 'string',
								enum: Object.values(CharacterListStatus),
								description: 'The new visibility status of the character list',
							},
						},
					},
				},
			},
		},
	})
	async updateCharacterList(@Param('id') id: number, @Body() data: UpdateCharacterListDto, @Req() request: AuthenticatedRequest) {
		return this.characterListService.updateCharacterList(id, request.user.id, data.name, data.status);
	}

	@Post('/:id/subscribe')
	@Authorized()
	@OpenAPI({
		summary: 'Subscribe to a character list',
		description: 'Subscribe the authenticated user to a character list',
		parameters: [
			{
				name: 'id',
				in: 'path',
				required: true,
				schema: { type: 'integer' },
				description: 'The ID of the character list',
			},
		],
	})
	async subscribeToCharacterList(@Param('id') id: number, @Req() request: AuthenticatedRequest) {
		return this.characterListService.subscribeToCharacterList(request.user.id, id);
	}

	@Post('/:id/unsubscribe')
	@Authorized()
	@OpenAPI({
		summary: 'Unsubscribe from a character list',
		description: 'Unsubscribe the authenticated user from a character list',
		parameters: [
			{
				name: 'id',
				in: 'path',
				required: true,
				schema: { type: 'integer' },
				description: 'The ID of the character list',
			},
		],
	})
	async unsubscribeFromCharacterList(@Param('id') id: number, @Req() request: AuthenticatedRequest) {
		return this.characterListService.unsubscribeFromCharacterList(request.user.id, id);
	}

	@Post('/:id/characters/:characterId/toggle-progress')
	@Authorized()
	@OpenAPI({
		summary: 'Toggle character progress',
		description: 'Mark a character as known or unknown for the current user',
		parameters: [
			{
				name: 'id',
				in: 'path',
				required: true,
				schema: { type: 'integer' },
				description: 'The ID of the character list',
			},
			{
				name: 'characterId',
				in: 'path',
				required: true,
				schema: { type: 'integer' },
				description: 'The ID of the character',
			},
		],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						properties: {
							characterId: {
								type: 'number',
								description: 'The ID of the character',
							},
							isKnown: {
								type: 'boolean',
								description: 'The new known status',
							},
						},
					},
				},
			},
		},
	})
	async toggleCharacterProgress(@Param('id') listId: number, @Param('characterId') characterId: number, @Body() data: ToggleCharacterProgressDto, @Req() request: AuthenticatedRequest) {
		return this.characterListService.toggleCharacterProgress(request.user.id, listId, characterId, data.isKnown);
	}

	@Put('/:id/characters/bulk-update-progress')
	@Authorized()
	@OpenAPI({
		summary: 'Bulk update character progress',
		description: 'Mark all characters in a list as known or unknown for the current user',
		parameters: [
			{
				name: 'id',
				in: 'path',
				required: true,
				schema: { type: 'integer' },
				description: 'The ID of the character list',
			},
		],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						properties: {
							isKnown: {
								type: 'boolean',
								description: 'The new known status for all characters',
							},
						},
					},
				},
			},
		},
	})
	async bulkUpdateCharacterProgress(@Param('id') listId: number, @Body() data: BulkUpdateCharacterProgressDto, @Req() request: AuthenticatedRequest) {
		return this.characterListService.bulkUpdateCharacterProgress(request.user.id, listId, data.isKnown);
	}

	@Post('/:id/characters')
	@Authorized()
	@OpenAPI({
		summary: 'Add characters to a character list',
		description: 'Add multiple characters to a character list (only creator can add)',
		parameters: [
			{
				name: 'id',
				in: 'path',
				required: true,
				schema: { type: 'integer' },
				description: 'The ID of the character list',
			},
		],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						properties: {
							characters: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										char: {
											type: 'string',
											description: 'The character',
										},
										romaji: {
											type: 'string',
											description: 'The romaji representation',
										},
										groupe: {
											type: 'number',
											description: 'The group number',
										},
										svg_id: {
											type: 'string',
											description: 'The SVG ID',
										},
										alternative_characters: {
											type: 'string',
											description: 'Alternative characters',
										},
										tenten: {
											type: 'boolean',
											description: 'Has tenten mark',
										},
										maru: {
											type: 'boolean',
											description: 'Has maru mark',
										},
										dakuon: {
											type: 'boolean',
											description: 'Is dakuon',
										},
										translate: {
											type: 'array',
											items: {
												type: 'string'
											},
											description: 'Translation array',
										},
										kana: {
											type: 'string',
											description: 'The kana representation',
										},
									},
									required: ['char', 'romaji', 'translate']
								},
								description: 'Array of characters to add',
							},
						},
						required: ['characters']
					},
				},
			},
		},
	})
	async addCharactersToList(@Param('id') listId: number, @Body() data: AddCharactersDto, @Req() request: AuthenticatedRequest) {
		return this.characterListService.addCharactersToList(request.user.id, listId, data.characters);
	}

	@Get('/:id/characters')
	@Authorized()
	@OpenAPI({
		summary: 'Get all characters from a character list',
		description: 'Retrieve all characters from a character list with user progress information',
		parameters: [
			{
				name: 'id',
				in: 'path',
				required: true,
				schema: { type: 'integer' },
				description: 'The ID of the character list',
			},
		],
	})
	async getCharactersFromList(@Param('id') listId: number, @Req() request: AuthenticatedRequest) {
		return this.characterListService.getCharactersFromList(request.user.id, listId);
	}

	@Get('/my-subscriptions')
	@Authorized()
	@OpenAPI({
		summary: 'Get user subscribed character lists',
		description: 'Retrieve all character lists that the authenticated user is subscribed to',
	})
	async getUserSubscribedLists(@Req() request: AuthenticatedRequest) {
		return this.characterListService.getUserSubscribedLists(request.user.id);
	}

	@Get('/search')
	@Authorized()
	@OpenAPI({
		summary: 'Search character lists',
		description: 'Search character lists with pagination and filters',
		parameters: [
			{
				name: 'searchTerm',
				in: 'query',
				required: false,
				schema: { type: 'string' },
				description: 'Search term for list name',
			},
			{
				name: 'status',
				in: 'query',
				required: false,
				schema: { type: 'string', enum: Object.values(CharacterListStatus) },
				description: 'Filter by status',
			},
			{
				name: 'creatorId',
				in: 'query',
				required: false,
				schema: { type: 'integer' },
				description: 'Filter by creator ID',
			},
			{
				name: 'page',
				in: 'query',
				required: false,
				schema: { type: 'integer', default: 1 },
				description: 'Page number for pagination',
			},
			{
				name: 'limit',
				in: 'query',
				required: false,
				schema: { type: 'integer', default: 20 },
				description: 'Number of items per page',
			},
		],
	})
	async searchCharacterLists(@QueryParams() query: SearchCharacterListsQueryDto, @Req() request: AuthenticatedRequest) {
		return this.characterListService.searchCharacterLists(
			request.user.id,
			query.searchTerm,
			query.status,
			query.creatorId,
			query.page || 1,
			query.limit || 20
		);
	}
}