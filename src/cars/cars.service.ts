import { Inject, Injectable } from "@nestjs/common";
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Model } from "mongoose";
import { CARS_MODEL } from "./cars.providers";
import { Cars } from "./schemas/carsSchema";


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
    return this.carsModel.findOne({ id }).exec();
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
