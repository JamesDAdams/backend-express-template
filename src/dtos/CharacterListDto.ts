import { CharacterListStatus } from '@prisma/client';

export class CreateCharacterListDto {
	name: string;
	status?: CharacterListStatus;
}

export class UpdateCharacterListDto {
	name?: string;
	status?: CharacterListStatus;
}

export class ToggleCharacterProgressDto {
	characterId: number;
	isKnown: boolean;
}

export class BulkUpdateCharacterProgressDto {
	isKnown: boolean;
}

export class AddCharactersDto {
	characters: {
		char: string;
		romaji: string;
		groupe?: number;
		svg_id?: number[];
		alternative_characters?: string;
		tenten?: boolean;
		maru?: boolean;
		dakuon?: boolean;
		translate?: string[];
		kana?: string;
	}[];
}

export class SearchCharacterListsQueryDto {
	searchTerm?: string;
	status?: CharacterListStatus;
	creatorId?: number;
	page?: number;
	limit?: number;
}