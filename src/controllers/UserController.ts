import {
  Body,
  JsonController,
  Get,
  Param,
  Post,
  Delete,
  OnUndefined,
} from 'routing-controllers';
import type { User } from '@prisma/client';
import { UserService } from '../services/';
import { CreateUserDto } from '../dtos/CreateUserDto';
import type { IUser } from '../interfaces/IUser';


@JsonController('/user')
export class UserController {

  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Get('/')
  index(): Promise<IUser[]> {
    return this.userService.index();
  }

  @Get('/:uuid')
  getByUUID(@Param('uuid') uuid: string): Promise<IUser | null> {
    return this.userService.getByUUID(uuid);
  }

  @Post('/add')
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Delete('/:uuid')
  @OnUndefined(204)
  delete(@Param('uuid') uuid: string): Promise<void> {
    return this.userService.delete(uuid);
  }
}
