import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @HttpCode(200)
    @Get()
    getCategories() {
        return this.categoriesService.getCategories();
    }

    @HttpCode(201)
    @Post()
    addCategories(@Body() category) {
        return this.categoriesService.addCategories(category);
    }
}
