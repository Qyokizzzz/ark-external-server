import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { omitBy, isUndefined } from 'lodash';
import type { IUser } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(@Query() query: IUser) {
    const { id, arkName, qq, wechatName, createdAt, updatedAt } = query;

    const params = omitBy(
      {
        id,
        arkName,
        qq,
        wechatName,
        createdAt,
        updatedAt,
      },
      isUndefined,
    );

    const users = await this.userService.index(params);
    return users;
  }

  @Post()
  async create(@Body() body: IUser) {
    const { arkName, qq, wechatName } = body;
    const user = await this.userService.create({
      arkName,
      qq,
      wechatName,
    });

    return user;
  }

  @Put()
  async update(@Body() body: IUser) {
    const updatedUser = await this.userService.update(body);
    return updatedUser;
  }

  @Delete()
  async destroy(@Param() params: { idString: string }) {
    const { idString } = params;
    const ids = idString.split(',');
    ids.forEach((id) => this.userService.destroy(+id));
    return `成功删除${ids.length}条数据`;
  }
}
