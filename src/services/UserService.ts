import { PrismaClient, type User } from '@prisma/client';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'routing-controllers';
import { CreateUserDto } from '../dtos/CreateUserDto';
import type { IUser } from '../interfaces/IUser';
import { hash } from '../utils/Hash';

export class UserService {
  private prisma: PrismaClient;

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
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    return users;
  }

  async getByUUID(uuid: string): Promise<IUser | null> {
    const user: IUser | null = await this.prisma.user.findUnique({
      where: { uuid },
      select: {
        uuid: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError(`User with UUID "${uuid}" not found`);
    }

    return user;
  }

  async getByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new InternalServerError(`Error: ${error}`);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // If email is already registered
      if (await this.getByEmail(createUserDto.email)) {
        console.log('Email already registered');
        throw new BadRequestError(`Error: Email is already registered`);
      }

      // Hash password
      createUserDto.password = await hash(createUserDto.password);

      return this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      throw new BadRequestError(`Error: ${error}`);
    }
  }

  async delete(uuid: string): Promise<void> {
    try {
      // Verify if exists
      this.getByUUID(uuid);

      await this.prisma.user.update({
        where: { uuid },
        data: { isActive: false },
      });
    } catch (error) {
      throw new BadRequestError(`Error: ${error}`);
    }
  }
}
