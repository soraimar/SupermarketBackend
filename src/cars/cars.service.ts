import { Inject, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { Model } from 'mongoose';
import { CARS_MODEL } from './cars.providers';
import { Cars } from './schemas/carsSchema';
import { Products } from '../products/schemas/productSchema';

@Injectable()
export class CarsService {
  constructor(
    @Inject(CARS_MODEL)
    private carsModel: Model<Cars>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    return this.carsModel.create(createCarDto);
  }

  async findOne(id: string) {
    return this.carsModel.findOne({ _id: id }).exec();
  }

  async update(id: string, products: Products[]) {
    return this.carsModel.updateOne({ _id: id }, { products }).exec();
  }
}
