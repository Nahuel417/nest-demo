import { Controller, Get, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get('seeder')
    @HttpCode(200)
    addCategories() {
        return this.categoriesService.addCategories();
    }

    @Get()
    @HttpCode(200)
    getCategories() {
        return this.categoriesService.getCategories();
    }
}
