import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Tribe } from 'src/tribe/tribe.model';
import { Relationship } from 'src/relationship/relationship.model';
import type { Optional } from 'sequelize';
import type { IUser } from './user.interface';

type UserCreation = Optional<IUser, 'id'>;

@Table
export class User extends Model<User, UserCreation> {
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
  arkName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
  })
  qq: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  wechatName: string;

  @BelongsToMany(() => User, () => Relationship)
  tribes: Tribe[];
}
