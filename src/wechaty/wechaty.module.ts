import { WechatyBuilder } from 'wechaty';
import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TribeService } from 'src/tribe/tribe.service';
import { RelationshipService } from 'src/relationship/relationship.service';

const wechatyFactory = {
  provide: 'WECHATY',
  inject: [UserService, TribeService, RelationshipService],
  useFactory: async (
    userService: UserService,
    tribeService: TribeService,
    relationshipService: RelationshipService,
  ) => {
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
      .on('friendship', async (friendship) => {
        switch (friendship.type()) {
          case wechaty.Friendship.Type.Receive: {
            const hello = friendship.payload?.hello || '';
            const [map, tribeName, arkName, qq] = hello.split(',');
            const wechatName = friendship.contact().name();

            const [user, tribe] = await Promise.all([
              userService.create({ arkName, qq, wechatName }),
              tribeService.create({ map, tribeName }),
            ]);

            relationshipService.create({ userId: user.id, tribeId: tribe.id });
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
