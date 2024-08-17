import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { IProduct } from './product.interface';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts() {
    return this.productsRepository.getProducts();
  }

  getProductById(id: number) {
    return this.productsRepository.getProductById(id);
  }

  createProduct(product: Omit<IProduct, 'id'>) {
    return this.productsRepository.createProduct(product);
  }

  deleteProduct(id: number) {
    return this.productsRepository.updateProduct(id);
  }

  updateProduct(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
