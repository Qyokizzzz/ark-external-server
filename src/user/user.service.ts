import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { IUser } from './user.interface';
import type { WhereOptions } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private UserModel: typeof User,
  ) {}

  async findUserByTribe(map: string, tribe: string) {
    const users = await this.UserModel.findAll({
      where: {
        map,
        tribe,
      },
    });

    return users;
  }

  async expired(map: string, tribe: string) {
    const record = await this.UserModel.findOne({
      where: {
        map,
        tribe,
      },
    });
    return record?.expiredAt ? new Date(record.expiredAt) < new Date() : false;
  }

  async index(params: WhereOptions<IUser>) {
    const users = this.UserModel.findAll({
      where: params,
    });
    return users;
  }

  async create(
    params: Omit<IUser, 'id' | 'expiredAt' | 'createdAt' | 'updatedAt'>,
  ) {
    const user = this.UserModel.create({
      ...params,
      expiredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return user;
  }

  async update(user: IUser) {
    const { id } = user;
    const updatedUser = await this.UserModel.update(user, { where: { id } });
    return updatedUser;
  }

  async destroy(id: number) {
    const number = await this.UserModel.destroy({
      where: {
        id,
      },
    });
    return number;
  }
}
