import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import * as data from 'src/utils/data.json';

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) {}

    async addCategories(): Promise<string> {
        for (const product of data) {
            const categoryExists = await this.categoriesRepository.findOne({
                where: { name: product.category },
            });

            if (!categoryExists) {
                const newCategory = this.categoriesRepository.create({
                    name: product.category,
                });
                await this.categoriesRepository.save(newCategory);
            }
        }

        return 'Categorias agregadas. ';
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoriesRepository.find();
    }
}
