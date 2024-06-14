import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tribe } from './tribe.model';
import type { ITribe } from './tribe.interface';

@Injectable()
export class TribeService {
  constructor(
    @InjectModel(Tribe)
    private TribeModel: typeof Tribe,
  ) {}
  async expired(map: string, tribeName: string) {
    const record = await this.TribeModel.findOne({
      where: {
        map,
        tribeName,
      },
    });
    return record?.expiredAt ? new Date(record.expiredAt) < new Date() : false;
  }

  async create(
    params: Omit<ITribe, 'id' | 'expiredAt' | 'createdAt' | 'updatedAt'>,
  ) {
    const [tribe] = await this.TribeModel.findOrCreate({ where: params });
    return tribe;
  }
}
