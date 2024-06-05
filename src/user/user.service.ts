import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, literal } from 'sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private UserModel: typeof User,
  ) {}
  async findUserByTribe(map: string, tribe: string) {
    const users = await this.UserModel.findAll({
      where: {
        tid: {
          [Op.in]: literal(
            `(select id from tribes where map='${map}' and tribe='${tribe}')`,
          ),
        },
      },
    });

    return users;
  }
}
