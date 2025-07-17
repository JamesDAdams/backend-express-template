import { JsonController, Post, Get, Param, Authorized, Req } from 'routing-controllers';
import { FriendService } from '../services/FriendService';
import { FriendshipStatus } from '@prisma/client';
import { FriendRequestDto } from '../dtos/FriendRequestDto';
import { FriendResponseDto } from '../dtos/FriendResponseDto';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/friends')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class FriendController {
	private readonly friendService: FriendService;

	constructor() { this.friendService = new FriendService(); }

	@Authorized()
	@Post('/request/:receiverId')
	@OpenAPI({
		summary: 'Send friend request',
		description: 'Send a friend request to another user'
	})
	@ResponseSchema(FriendRequestDto)
	async sendFriendRequest(@Param('receiverId') receiverId: number, @Req() request: any) {
		return await this.friendService.sendFriendRequest(request.user.id, receiverId);
	}

	@Post('/request/:requestId/:status')
	@Authorized()
	@OpenAPI({
		summary: 'Respond to friend request',
		description: 'Accept or refuse a friend request'
	})
	@ResponseSchema(FriendResponseDto)
	async respondToFriendRequest(@Param('requestId') requestId: number, @Param('status') status: FriendshipStatus, @Req() request: any) {
		return await this.friendService.updateFriendRequest(requestId, request.user.id, status);
	}

	@Get('/list')
	@Authorized()
	@OpenAPI({
		summary: 'Friends list',
		description: 'Get the list of friends for the connected user'
	})
	async getFriendsList(@Req() request: any) { return await this.friendService.getFriendsList(request.user.id); }

	@Get('/pending-requests')
	@Authorized()
	@OpenAPI({
		summary: 'Pending friend requests',
		description: 'Get the list of pending friend requests sent by the user'
	})
	async getPendingFriendRequests(@Req() request: any) { return await this.friendService.getPendingFriendRequests(request.user.id); }

	@Get('/received-requests')
	@Authorized()
	@OpenAPI({
		summary: 'Received friend requests',
		description: 'Get the list of pending friend requests received by the user'
	})
	async getReceivedFriendRequests(@Req() request: any) { return await this.friendService.getReceivedFriendRequests(request.user.id); }
}
