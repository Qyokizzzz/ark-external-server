import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TribeController } from './tribe.controller';
import { TribeService } from './tribe.service';
import { Tribe } from './tribe.model';

@Module({
  imports: [SequelizeModule.forFeature([Tribe])],
  controllers: [TribeController],
  providers: [TribeService],
  exports: [TribeService],
})
export class TribeModule {}
