import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { IProduct } from './product.interface';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getProducts(page: number, limit: number): Promise<IProduct[]> {
    return await this.productsRepository.getProducts(page, limit);
  }

  async getProductById(id: number): Promise<IProduct | string> {
    const producto = await this.productsRepository.getProductById(id);
    if (!producto) return 'No se encontro el producto';

    return producto;
  }

  async createProduct(product: Omit<IProduct, 'id'>) {
    const producto = await this.productsRepository.createProduct(product);

    return producto;
  }

  async updateProduct(id: number, updateProduct: IProduct) {
    const producto = await this.productsRepository.updateProduct(
      id,
      updateProduct,
    );

    return producto;
  }

  async deleteProduct(id: number): Promise<number | string> {
    const producto = await this.productsRepository.deleteProduct(id);
    if (!producto) return 'No se encontro el producto';

    return producto.id;
  }
}
