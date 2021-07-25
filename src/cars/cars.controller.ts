import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ProductsService } from '../products/products.service';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly productService: ProductsService,
  ) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    return await this.carsService.create(createCarDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const car = await this.carsService.findOne(id);

    if (!car) throw new HttpException('Car not found', HttpStatus.NOT_FOUND);

    const agrupacionProductos = {};
    for (let x = 0; x < car.products.length; x++) {
      const product = car.products[x];
      const price = car.products[x].price;

      if (!agrupacionProductos[product.id]) {
        agrupacionProductos[product.id] = product;
        agrupacionProductos[product.id]._doc.cantidad = 1;
        agrupacionProductos[product.id]._doc.total = price;
      } else {
        agrupacionProductos[product.id]._doc.cantidad++;
        agrupacionProductos[product.id]._doc.total =
          agrupacionProductos[product.id]._doc.total + price;
      }
    }
    car.products = Object.keys(agrupacionProductos).map(
      (key) => agrupacionProductos[key],
    );
    return car;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    const product = await this.productService.findProducts(
      updateCarDto.products,
    );
    return await this.carsService.update(id, product);
  }

  @Put('add_product/:id')
  async updateCars(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    const product = await this.productService.findProducts(
      updateCarDto.products,
    );

    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    const car = await this.carsService.findOne(id);
    if (!car) throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    car.products.push(product[0]);

    await this.carsService.update(id, car.products);
    return car;
  }

  @Put('delete_product/:id')
  async remobeProductCar(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    const car = await this.carsService.findOne(id);
    if (!car) throw new HttpException('Car not found', HttpStatus.NOT_FOUND);

    let found = false;
    const newProducts = [];
    for (let x = 0; x < car.products.length; x++) {
      const product = car.products[x];
      if (!found && product._id.toString() != updateCarDto.products[0]) {
        found = true;
        continue;
      }
      newProducts.push(product);
    }

    car.products = newProducts;

    await this.carsService.update(id, car.products);
    return car;
  }
}
