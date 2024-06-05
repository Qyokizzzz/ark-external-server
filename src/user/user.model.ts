import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    comment: 'tribe id',
  })
  tid: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'wechat id',
  })
  wid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'wechat name',
  })
  wname: string;
}
