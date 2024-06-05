import {
  Controller,
  Get,
  Query,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { WechatyBuilder } from 'wechaty';
import { TribeService } from './tribe.service';
import { UserService } from '../user/user.service';

const wechaty = WechatyBuilder.build({
  puppet: 'wechaty-puppet-wechat4u',
  puppetOptions: {
    uos: true,
  },
});

wechaty
  .on('scan', (qrcode, status) =>
    console.log(
      `Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(
        qrcode,
      )}`,
    ),
  )
  .on('login', (user) => console.log(`User ${user} logged in`))
  .on('message', (message) => console.log(`Message: ${message}`));

wechaty.start();

@Controller('tribe')
export class TribeController {
  constructor(
    private readonly tribeService: TribeService,
    private readonly userService: UserService,
  ) {}

  @Get('log')
  async log(
    @Query() query: { map: string; tribe: string; msg: string },
    @Res() res: Response,
  ) {
    const { map, tribe, msg } = query;

    const expired = await this.tribeService.expired(map, tribe);
    if (expired) {
      throw new HttpException('服务已过期', HttpStatus.UNAUTHORIZED);
    }

    const users = await this.userService.findUserByTribe(map, tribe);
    console.log(users);
    const contacts = await wechaty.Contact.findAll();
    console.log(contacts);
    contacts.forEach((contact) => {
      console.log(contact.payload);
      contact.say(msg);
    });
    res.status(HttpStatus.OK);
  }

  @Get('getFriends')
  async getFriends(@Res() res: Response) {
    const friends = await wechaty.Contact.findAll();
    res.status(HttpStatus.OK).json(friends);
  }
}
