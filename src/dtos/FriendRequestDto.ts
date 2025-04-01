import { IsNumber } from 'class-validator';

export class FriendRequestDto {
	@IsNumber()
	requesterId!: number;
}
