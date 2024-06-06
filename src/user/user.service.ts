import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { IUser } from './user.interface';
// import type { WhereOptions } from 'sequelize';

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

  async index(params: IUser) {
    const users = this.UserModel.findAll({
      where: params as any,
    });
    return users;
  }

  async create(params: Omit<IUser, 'id'>) {
    const user = this.UserModel.create(params);
    return user;
  }
}
