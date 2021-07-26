import { Inject, Injectable } from '@nestjs/common';
import { DISCOUNTS_MODEL } from './discounts.provider';
import { Model } from 'mongoose';
import { Discounts } from './schemas/discountSchema';

@Injectable()
export class DiscountsService {
  constructor(
    @Inject(DISCOUNTS_MODEL)
    private discountsModel: Model<Discounts>,
  ) {}

  async findByBrand(brandsIds: string[]) {
    return await this.discountsModel
      .find({
        brand: {
          $in: brandsIds,
        },
      })
      .exec();
  }
}
