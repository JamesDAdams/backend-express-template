import {
  Body,
  JsonController,
  Get,
  Param,
  Post,
  Delete,
  OnUndefined,
  Authorized,
  Req,
  QueryParams,
} from 'routing-controllers';
import type { User } from '@prisma/client';
import { UserService } from '../services/';
import { CreateUserDto } from '../dtos/CreateUserDto';
import type { IUser } from '../interfaces/IUser';
import { ResetPasswordDto } from '../dtos/ResetPasswordDto';
import { SearchUsersDto } from '../dtos/SearchUsersDto';
import { OpenAPI } from 'routing-controllers-openapi';
import { IUserSearch } from '../interfaces/IUserSearch';

@JsonController('/user')
export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Authorized()
  @Authorized(['admin'])
  @Get('/')
  index(): Promise<IUser[]> {
    return this.userService.index();
  }

  @Authorized()
  @Get('/search')
  @OpenAPI({
    summary: 'Search users',
    description: 'Search users by name with pagination',
    parameters: [
      {
        in: 'query',
        name: 'name',
        description: 'Name to search for',
        required: false,
      },
      {
        in: 'query',
        name: 'page',
        description: 'Page number',
        required: false,
      },
      {
        in: 'query',
        name: 'limit',
        description: 'Number of items per page',
        required: false,
      },
    ],
  })
  async searchUsers(@Req() request: any, @QueryParams() searchDto: SearchUsersDto): Promise<{ users: IUserSearch[], total: number }> {
    return this.userService.searchUsers(request.user.uuid, searchDto.name, searchDto.page, searchDto.limit);
  }

  @Authorized()
  @Authorized(['admin'])
  @Get('/:uuid')
  getByUUID(@Param('uuid') uuid: string): Promise<IUser | null> {
    return this.userService.getByUUID(uuid);
  }

  @Authorized()
  @Authorized(['admin'])
  @Post('/add')
  async create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Authorized()
  @Delete('/delete-account')
  @OnUndefined(204)
  delete(@Req() request: any): Promise<void> {
    return this.userService.delete(request.user.uuid);
  }

  @Post('/reset-password')
  @Authorized()
  resetPassword(@Body() data: ResetPasswordDto, @Req() request: any): Promise<Record<string, unknown>> {
    return this.userService.resetPassword(request.user.uuid, data);
  }
}
