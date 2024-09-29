import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/categories.entity';
import { Product } from './products.entity';
import * as data from 'src/utils/data.json';

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) {}

    async getProducts(page: number, limit: number): Promise<Product[]> {
        const products = await this.productsRepository.find({
            relations: {
                category_id: true,
            },
        });

        let inStock = products.filter((prod) => prod.stock > 0);

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        inStock = inStock.slice(startIndex, endIndex);

        return inStock;
    }

    async getProductById(id: string): Promise<Product> {
        const producto = this.productsRepository.findOneBy({ id });

        return producto;
    }

    async addProduct(): Promise<string> {
        const categories = await this.categoriesRepository.find();

        data?.map(async (element) => {
            const category = categories.find(
                (category) => category.name === element.category,
            );

            const producto = new Product();
            producto.name = element.name;
            producto.price = element.price;
            producto.stock = element.stock;
            producto.description = element.description;
            producto.category_id = category;

            await this.productsRepository
                .createQueryBuilder()
                .insert()
                .into(Product)
                .values(producto)
                .orUpdate(['description', 'stock', 'price'], ['name'])
                .execute();
        });

        return 'Productos agregados';
    }

    async createProduct(product: Partial<Product>): Promise<Product> {
        const newProduct = this.productsRepository.create({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imgUrl: product.imgUrl,
        });

        await this.productsRepository.save(newProduct);

        return newProduct;
    }

    async updateProduct(id: string, updateProduct: Product): Promise<string> {
        const producto = await this.productsRepository.findOneBy({ id });
        if (!producto)
            throw new NotFoundException('No se encontro el producto');

        Object.assign(producto, updateProduct);
        await this.productsRepository.save(producto);

        return producto.id;
    }
}
