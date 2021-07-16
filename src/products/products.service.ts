import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCTS_MODEL } from './products.providers';
import { Model } from 'mongoose';
import { Products } from './schemas/productSchema';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_MODEL)
    private productsModel: Model<Products>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    //const createProductDto = new this.productsModel(createProductDto);
    //return createProductDto.save();
  }

  async findAll() {
    return this.productsModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
