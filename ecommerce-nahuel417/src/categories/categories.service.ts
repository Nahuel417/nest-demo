import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    addCategories(): Promise<string> {
        return this.categoriesRepository.addCategories();
    }

    getCategories(): Promise<Category[]> {
        return this.categoriesRepository.getCategories();
    }
}
