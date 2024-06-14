import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
  Inject,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TribeService } from './tribe.service';
import type { WechatyInterface } from 'wechaty/impls';

@Controller('tribe')
export class TribeController {
  constructor(
    private readonly userService: UserService,
    private readonly tribeService: TribeService,
    @Inject('WECHATY') private readonly wechaty: WechatyInterface,
  ) {}

  @Get('log')
  async log(@Query() query: { map: string; tribeName: string; msg: string }) {
    const { map, tribeName, msg } = query;

    const expired = await this.tribeService.expired(map, tribeName);
    if (expired) {
      throw new HttpException('服务已过期', HttpStatus.UNAUTHORIZED);
    }

    const users = await this.userService.findUserByTribe(map, tribeName);
    users.forEach((user) => {
      this.wechaty.Contact.findAll({ name: user.wechatName }).then(
        (contacts) => {
          // 同部落中可能有成员重名
          contacts?.forEach((contact) =>
            contact.say(`${map}----${tribeName}----${msg}`),
          );
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
