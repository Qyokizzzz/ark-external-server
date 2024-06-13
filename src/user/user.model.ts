import { Column, Model, Table, DataType } from 'sequelize-typescript';
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
  })
  map: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tribe: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  arkName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  qq: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  wname: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiredAt: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: string;
}
