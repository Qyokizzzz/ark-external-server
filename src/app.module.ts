import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { TribeModule } from './tribe/tribe.module';
import { RelationshipModule } from './relationship/relationship.module';
import config from '../config';

@Module({
  imports: [
    UserModule,
    TribeModule,
    RelationshipModule,
    SequelizeModule.forRoot({
      ...config.sequelize,
      autoLoadModels: true,
      synchronize: true,
    }),
    RelationshipModule,
  ],
})
export class AppModule {}
