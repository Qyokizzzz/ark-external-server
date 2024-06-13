import { WechatyBuilder } from 'wechaty';
import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

const wechatyFactory = {
  provide: 'WECHATY',
  inject: [UserService],
  useFactory: async (userService: UserService) => {
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
      .on('message', (message) => console.log(`Message: ${message}`))
      .on('friendship', (friendship) => {
        switch (friendship.type()) {
          case wechaty.Friendship.Type.Receive: {
            const hello = friendship.payload?.hello || '';
            const [map, tribe, arkName, qq] = hello.split(',');
            const wname = friendship.contact().name();
            userService.create({ map, tribe, arkName, qq, wname });
            friendship.accept();
          }
        }
      });

    await wechaty.start();
    return wechaty;
  },
};

@Module({
  providers: [wechatyFactory],
  exports: ['WECHATY'],
})
export class WechatyModule {}
