import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import config from '../config';
import { UserModule } from './user/user.module';
import { TribeModule } from './tribe/tribe.module';

@Module({
  imports: [
    UserModule,
    TribeModule,
    SequelizeModule.forRoot({
      ...config.sequelize,
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
