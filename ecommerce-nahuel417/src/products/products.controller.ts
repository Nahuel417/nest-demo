import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { validateProduct } from 'src/utils/validate';
import { Product } from './products.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    //* GET *//
    @HttpCode(200)
    @Get()
    getProducts(@Query('page') page: number, @Query('limit') limit: number) {
        if (page && limit) {
            return this.productsService.getProducts(page, limit);
        }
        return this.productsService.getProducts(1, 5);
    }

    @HttpCode(200)
    @Get('seeder')
    addProduct() {
        return this.productsService.addProduct();
    }

    @HttpCode(200)
    @Get(':id')
    getProductById(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.getProductById(id);
    }

    //* POST *//
    @HttpCode(201)
    @Post()
    createProduct(@Body() product: Product) {
        if (validateProduct(product))
            return this.productsService.createProduct(product);
        else return 'No es un producto valido';
    }

    //* PATCH *//
    @ApiBearerAuth()
    @Patch(':id')
    @Roles(Role.admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(200)
    updateUser(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateProduct: Product,
    ) {
        return this.productsService.updateProduct(id, updateProduct);
    }
}
