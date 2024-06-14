import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TribeController } from './tribe.controller';
import { TribeService } from './tribe.service';
import { User } from 'src/user/user.model';
import { Tribe } from './tribe.model';
import { WechatyModule } from 'src/wechaty/wechaty.module';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    SequelizeModule.forFeature([Tribe]),
    WechatyModule,
  ],
  controllers: [TribeController],
  providers: [TribeService],
  exports: [TribeService],
})
export class TribeModule {}
