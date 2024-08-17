import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from './product.interface';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //* GET *//
  @HttpCode(200)
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @HttpCode(200)
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(+id);
  }

  //* POST *//
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post()
  createProduct(@Body() product: IProduct) {
    return this.productsService.createProduct(product);
  }

  //* PUT *//
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string) {
    return this.productsService.updateProduct(+id);
  }

  //* DELETE *//
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.productsService.deleteProduct(+id);
  }
}
