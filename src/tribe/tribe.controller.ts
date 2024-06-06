import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
  Inject,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import type { WechatyInterface } from 'wechaty/impls';

@Controller('tribe')
export class TribeController {
  constructor(
    private readonly userService: UserService,
    @Inject('WECHATY') private readonly wechaty: WechatyInterface,
  ) {}

  @Get('log')
  async log(@Query() query: { map: string; tribe: string; msg: string }) {
    const { map, tribe, msg } = query;

    const expired = await this.userService.expired(map, tribe);
    if (expired) {
      throw new HttpException('服务已过期', HttpStatus.UNAUTHORIZED);
    }

    const users = await this.userService.findUserByTribe(map, tribe);
    users.forEach((user) => {
      this.wechaty.Contact.findAll({ alias: user.wechatAlias }).then(
        (contacts) => {
          console.log(contacts);
          contacts?.forEach((contact) => contact.say(msg)); // 处理同地图同部落重名的情况
        },
      );
    });

    return 'ok';
  }

  @Get('getFriends')
  async getFriends() {
    const friends = await this.wechaty.Contact.findAll();
    return friends;
  }
}
