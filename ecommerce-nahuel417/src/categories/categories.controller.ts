import { Controller, Get, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @HttpCode(200)
    @Get('seeder')
    addCategories() {
        return this.categoriesService.addCategories();
    }

    @HttpCode(200)
    @Get()
    getCategories() {
        return this.categoriesService.getCategories();
    }
}
