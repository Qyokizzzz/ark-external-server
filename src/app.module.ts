import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import config from '../config';
// import { UserController } from './user/user.controller';
// import { TribeController } from './tribe/tribe.controller';
// import { UserService } from './user/user.service';
// import { TribeService } from './tribe/tribe.service';
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
  // controllers: [UserController, TribeController],
  // providers: [UserService, TribeService],
})
export class AppModule {}
