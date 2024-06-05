import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tribe } from './tribe.model';

@Injectable()
export class TribeService {
  constructor(
    @InjectModel(Tribe)
    private tribeModel: typeof Tribe,
  ) {}
  async expired(map: string, tribe: string) {
    const record = await this.tribeModel.findOne({
      where: {
        map,
        tribe,
      },
    });
    return record?.expiredAt ? new Date(record.expiredAt) < new Date() : false;
  }
}
