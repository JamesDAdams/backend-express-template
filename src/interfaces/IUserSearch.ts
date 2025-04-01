import { UserStatus } from '@prisma/client';

export interface IUserSearch {
	id: number;
	name: string;
	avatar: string;
    status?: UserStatus;
	level: number;
	lastSeen: Date;
	createdAt: Date;
	userRoles: {
		userId: number;
		roleId: number;
	}[];
}
