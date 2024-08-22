import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    getCategories() {
        return this.categoriesRepository.getCategories();
    }

    addCategories(category) {
        return this.categoriesRepository.addCategories(category);
    }
}
