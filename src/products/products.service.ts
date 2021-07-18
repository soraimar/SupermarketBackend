import { Inject, Injectable } from '@nestjs/common';
import { PRODUCTS_MODEL } from './products.providers';
import { Model } from 'mongoose';
import { Products } from './schemas/productSchema';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_MODEL)
    private productsModel: Model<Products>,
  ) {}

  async findAll() {
    return this.productsModel.find().exec();
  }

  async findProducts(products: [string]) {
    return this.productsModel.find({
      _id: {
        $in: products,
      },
    });
  }
}
