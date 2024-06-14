import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { Relationship } from 'src/relationship/relationship.model';
import type { Optional } from 'sequelize';
import type { ITribe } from './tribe.interface';

type TribeCreation = Optional<ITribe, 'id'>;

@Table
export class Tribe extends Model<Tribe, TribeCreation> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
  })
  map: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
  })
  tribeName: string;

  @BelongsToMany(() => User, () => Relationship)
  users: User[];

  @Column({
    type: DataType.DATE,
  })
  expiredAt: string;
}
