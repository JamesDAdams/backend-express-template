import { UserStatus } from '@prisma/client';

// Interface for user roles
export interface IUserRole {
	userId: number;
	roleId: number;
}

export interface IUser {
	id?: number;
	uuid: string;
	name: string;
	email: string;
	password?: string;
	isActive: boolean;
	status: UserStatus;
	level: number;
	createdAt: Date;
	updatedAt: Date;
	role?: any;
	avatar?: string;
	emailVerified?: boolean;
	userRoles?: IUserRole[];
}

export type IUserWithoutPassword = Omit<IUser, 'password'>;

export interface JwtPayload {
  user: IUserWithoutPassword;
  iat?: number;
  exp?: number;
}
