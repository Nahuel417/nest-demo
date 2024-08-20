import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from './product.interface';
import { AuthGuard } from 'src/guards/auth.guard';
import { validateProduct } from 'src/utils/validate';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //* GET *//
  @HttpCode(200)
  @Get()
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productsService.getProducts(page, limit);
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
    if (validateProduct(product))
      return this.productsService.createProduct(product);
    else return 'No es un producto valido';
  }

  //* PUT *//
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateProduct: IProduct) {
    return this.productsService.updateProduct(+id, updateProduct);
  }

  //* DELETE *//
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.productsService.deleteProduct(+id);
  }
}
