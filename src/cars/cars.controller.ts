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
import { DiscountsService } from '../discounts/discounts.service';
import { Discounts } from '../discounts/schemas/discountSchema';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly productService: ProductsService,
    private readonly discountService: DiscountsService,
  ) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    return await this.carsService.create(createCarDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const mongooseCar = await this.carsService.findOne(id);

    if (!mongooseCar)
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);

    const car = mongooseCar.toJSON();

    const agrupacionProductos = {};
    for (let x = 0; x < car.products.length; x++) {
      const product = car.products[x];
      const price = car.products[x].price;

      if (!agrupacionProductos[product.id]) {
        agrupacionProductos[product.id] = product;
        agrupacionProductos[product.id].quantity = 1;
        agrupacionProductos[product.id].total = price;
      } else {
        agrupacionProductos[product.id].quantity++;
        agrupacionProductos[product.id].total =
          agrupacionProductos[product.id].total + price;
      }
    }

    car.products = Object.keys(agrupacionProductos).map(
      (key) => agrupacionProductos[key],
    );

    const totalByBrand = {};
    for (let i = 0; i < car.products.length; i++) {
      const product = car.products[i];
      if (!totalByBrand[product.brand]) {
        totalByBrand[product.brand] = product.price;
      } else {
        totalByBrand[product.brand] += product.price;
      }
    }

    const discount = await this.discountService.findByBrand(
      Object.keys(totalByBrand),
    );

    const mapDiscount = {};
    discount.forEach((value) => {
      mapDiscount[value.brand] = value;
    });

    let biggerDiscount: Discounts;
    let betterDiscount: Discounts;

    Object.keys(totalByBrand).forEach((brand) => {
      const total = totalByBrand[brand];
      const currentDiscountBrand = mapDiscount[brand];
      if (
        total > currentDiscountBrand.threshold &&
        CarsController.isBiggerDiscount(currentDiscountBrand, biggerDiscount)
      ) {
        biggerDiscount = currentDiscountBrand;
      } else if (
        total < currentDiscountBrand.threshold &&
        CarsController.isBetterDiscount(
          betterDiscount,
          currentDiscountBrand &&
            (!biggerDiscount ||
              currentDiscountBrand.discount > biggerDiscount.discount),
        )
      ) {
        betterDiscount = currentDiscountBrand;
      }
    });

    car.betterDiscount = betterDiscount;
    car.biggerDiscount = biggerDiscount;
    return car;
  }

  private static isBiggerDiscount(currentDiscountBrand, biggerDiscount) {
    return (
      !biggerDiscount || currentDiscountBrand.discount < biggerDiscount.discount
    );
  }

  private static isBetterDiscount(currentDiscountBrand, betterDiscount) {
    return (
      !currentDiscountBrand ||
      currentDiscountBrand.discount < betterDiscount.discount
    );
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
