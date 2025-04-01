import { IsNumber } from 'class-validator';

export class FriendResponseDto {
	@IsNumber()
	userId!: number;
}
