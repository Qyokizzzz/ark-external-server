import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { Tribe } from 'src/tribe/tribe.model';
import type { Optional } from 'sequelize';
import type { IRelationship } from './relationship.interface';

type RelationshipCreation = Optional<IRelationship, 'id'>;

@Table
export class Relationship extends Model<Relationship, RelationshipCreation> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Tribe)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tribeId: number;
}
