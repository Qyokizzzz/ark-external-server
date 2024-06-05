import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Tribe extends Model<Tribe> {
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
