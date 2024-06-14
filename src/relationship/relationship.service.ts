import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Relationship } from './relationship.model';
import type { IRelationship } from './relationship.interface';

@Injectable()
export class RelationshipService {
  constructor(
    @InjectModel(Relationship)
    private RelationshipModel: typeof Relationship,
  ) {}

  async create(params: Omit<IRelationship, 'id'>) {
    const [relationship] = await this.RelationshipModel.findOrCreate({
      where: params,
    });
    return relationship;
  }
}
