import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import type { IUser } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(@Query() query: IUser) {
    const users = await this.userService.index(query);
    return users;
  }

  @Post()
  async create(@Body() body: IUser) {
    const { map, tribe, wechatAlias, arkName, qq } = body;
    const user = await this.userService.create({
      map,
      tribe,
      wechatAlias,
      arkName,
      qq,
      expiredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return user;
  }
}
