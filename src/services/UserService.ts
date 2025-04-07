import { PrismaClient, type User, UserStatus } from '@prisma/client';
import { BadRequestError, InternalServerError, NotFoundError } from 'routing-controllers';
import { CreateUserDto } from '../dtos/CreateUserDto';
import type { IUser } from '../interfaces/IUser';
import { hash } from '../utils/Hash';
import { ResetPasswordDto } from '../dtos/ResetPasswordDto';
import { GravatarService } from './GravatarService';
import { IUserSearch } from '../interfaces/IUserSearch';

export class UserService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async index(): Promise<IUser[]> {
    const users: IUser[] = await this.prisma.user.findMany({
      select: {
        uuid: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        status: true,
        level: true,
        lastSeen: true,
        avatar: true,
        emailVerified: true,
        userRoles: true
      },
    });
    return users;
  }

  async getByUUID(uuid: string): Promise<IUser | null> {
    try {
      const user: IUser | null = await this.prisma.user.findUnique({
        where: { uuid },
        select: {
          uuid: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          status: true,
          level: true,
          lastSeen: true,
          isActive: true,
          avatar: true,
          emailVerified: true,
          userRoles: true
        },
      });

      if (!user) {
        throw new NotFoundError(`User with UUID "${uuid}" not found`);
      }

      return user;
    } catch (error) {
      throw new InternalServerError('Error getting user by UUID');
    }
  }

  async getByEmail(email: string): Promise<IUser | null> {
    try {
      const user: IUser | null = await this.prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          uuid: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          isActive: true,
          password: true,
          level: true,
          lastSeen: true,
          avatar: true,
          emailVerified: true,
          status: true,
          userRoles: true
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerError('Error getting user by email');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.getByEmail(createUserDto.email);
      if (existingUser) throw new BadRequestError('Email is already registered');

      const gravatarService = new GravatarService();
      const avatar = await gravatarService.getGravatarUrl(createUserDto.email);
      if(avatar) createUserDto.avatar = avatar;

      const hashedPassword = await hash(createUserDto.password);
      const { ...userData } = createUserDto;

      return this.prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new InternalServerError('Error creating user');
    }
  }

  async delete(uuid: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { uuid },
        data: { isActive: false },
      });
    }
    catch (error) {
      throw new InternalServerError('Error deleting user');
    }
  }

  async resetPassword(uuid: string, resetPasswordDto: ResetPasswordDto ): Promise<Record<string, unknown>> {
    try {
      const passwordHashed = await hash(resetPasswordDto.newPassword);
      await this.prisma.user.update({
        where: { uuid },
        data: { password: passwordHashed },
      });
    } catch (error) {
      throw new InternalServerError('Error resetting password');
    }

    return {
      ok: 1,
      message: 'Password successfully reset',
    };
  }

  async searchUsers(uuid: string, name?: string, page: number = 1, limit: number = 10): Promise<{ users: IUserSearch[], total: number }> {
    try {
      const skip = (page - 1) * limit;
      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          where: {
            name: {
              contains: name,
              mode: 'insensitive'
            },
            isActive: true,
            uuid: {
              not: uuid // Exclude the current user from results
            }
          },
          select: {
            id: true,
            name: true,
            avatar: true,
            createdAt: true,
            status: true,
            level: true,
            lastSeen: true,
            userRoles: {
              select: {
                userId: true,
                roleId: true
              }
            }
          },
          skip,
          take: limit
        }),
        this.prisma.user.count({
          where: {
            name: {
              contains: name,
              mode: 'insensitive'
            },
            isActive: true,
            uuid: {
              not: uuid // Exclude the current user from count
            }
          }
        })
      ]);

      return { users, total };
    } catch (error) {
      throw new InternalServerError('Error searching users');
    }
  }

}
