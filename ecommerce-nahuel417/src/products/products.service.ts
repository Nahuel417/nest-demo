import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository) {}

    async getProducts(page: number, limit: number): Promise<Product[]> {
        return await this.productsRepository.getProducts(page, limit);
    }

    async getProductById(id: string): Promise<Product> {
        const producto = await this.productsRepository.getProductById(id);
        if (!producto)
            throw new NotFoundException('No se encontro el producto');

        return producto;
    }

    async addProduct(): Promise<string> {
        return this.productsRepository.addProduct();
    }

    async createProduct(product: Partial<Product>): Promise<Product> {
        const producto = await this.productsRepository.createProduct(product);

        return producto;
    }

    async updateProduct(id: string, updateProduct: Product): Promise<string> {
        const producto = await this.productsRepository.updateProduct(
            id,
            updateProduct,
        );

        return producto;
    }
}
