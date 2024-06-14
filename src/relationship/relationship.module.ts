import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RelationshipService } from './relationship.service';
import { Relationship } from './relationship.model';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([Relationship])],
  providers: [RelationshipService],
  exports: [RelationshipService],
})
export class RelationshipModule {}
