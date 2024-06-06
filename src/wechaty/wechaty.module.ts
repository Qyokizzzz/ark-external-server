import { Module } from '@nestjs/common';
import { WechatyBuilder } from 'wechaty';

const wechatyFactory = {
  provide: 'WECHATY',
  useFactory: async () => {
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

    await wechaty.start();
    return wechaty;
  },
};

@Module({
  providers: [wechatyFactory],
  exports: ['WECHATY'],
})
export class WechatyModule {}
