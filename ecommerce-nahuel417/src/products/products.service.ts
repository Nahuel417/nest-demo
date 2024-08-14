import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/users/users.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts() {
    return this.productsRepository.getProducts();
  }
}
