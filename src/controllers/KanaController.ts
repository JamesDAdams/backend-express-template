import { JsonController, Post, Authorized, Body, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { KanaService } from '../services/KanaService';

class ToggleKanaLearnedDto {
	character: string;
	isLearned: boolean;
}

@JsonController('/kana')
export class KanaController {
	private readonly kanaService: KanaService;

	constructor() {
		this.kanaService = new KanaService();
	}

	@Post('/toggle-learned')
	@Authorized()
	@OpenAPI({
		summary: 'Toggle kana learned status',
		description: 'Mark a kana as learned or not learned for the current user',
		requestBody: {
			content: {
				'application/json': {
					schema: {
						properties: {
							character: {
								type: 'string',
								description: 'The kana character to toggle',
							},
							isLearned: {
								type: 'boolean',
								description: 'The new learned status',
							},
						},
					},
				},
			},
		},
	})
	async toggleKanaLearned(@Body() data: ToggleKanaLearnedDto, @Req() request: any) {
		return this.kanaService.toggleKanaLearned(request.user.id, data.character, data.isLearned);
	}
}
