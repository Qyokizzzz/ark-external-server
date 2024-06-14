import { Op, literal } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import type { IUser } from './user.interface';
import type { WhereOptions } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private UserModel: typeof User,
  ) {}

  async findUserByTribe(map: string, tribeName: string) {
    const users = await this.UserModel.findAll({
      where: {
        id: {
          [Op.in]: literal(
            `(select userId from relationships where tribeId=(select id from tribes where map='${map}' and tribeName='${tribeName}'))`,
          ),
        },
      },
    });

    return users;
  }

  async index(params: WhereOptions<IUser>) {
    const users = await this.UserModel.findAll({
      where: params,
    });
    return users;
  }

  async create(params: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>) {
    const [user] = await this.UserModel.findOrCreate({ where: params });
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
