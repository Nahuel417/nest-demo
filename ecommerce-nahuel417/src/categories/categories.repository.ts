import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesRepository {
    private categories = [
        { id: 1, name: 'telefonos' },
        { id: 2, name: 'computadoras' },
        { id: 3, name: 'electrodomesticos' },
    ];

    async getCategories() {
        return this.categories;
    }

    async addCategories(category) {
        const id = this.categories.length + 1;
        this.categories = [...this.categories, { id, ...category }];
        return { id, ...category };
    }
}
