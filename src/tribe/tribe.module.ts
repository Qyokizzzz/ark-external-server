import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TribeController } from './tribe.controller';
import { WechatyModule } from 'src/wechaty/wechaty.module';
import { User } from 'src/user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User]), WechatyModule],
  controllers: [TribeController],
})
export class TribeModule {}
