import { Injectable } from '@nestjs/common';
import { IProduct } from './product.interface';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'Laptop',
      description: 'High-performance laptop with 16GB RAM and 512GB SSD.',
      price: 1200.99,
      stock: true,
      imgUrl: 'https://example.com/images/laptop.jpg',
    },
    {
      id: 2,
      name: 'Smartphone',
      description: 'Latest model smartphone with 5G connectivity.',
      price: 899.99,
      stock: false,
      imgUrl: 'https://example.com/images/smartphone.jpg',
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      description:
        'Noise-cancelling wireless headphones with 30-hour battery life.',
      price: 199.99,
      stock: true,
      imgUrl: 'https://example.com/images/headphones.jpg',
    },
  ];

  async getProducts() {
    return this.products;
  }

  async getProductById(id: number): Promise<IProduct | string> {
    const producto = this.products.find((product) => product.id === id);

    if (producto) return producto;

    return 'No se encontro el producto';
  }

  async createProduct(product: Omit<IProduct, 'id'>) {
    const id = this.products.length + 1;
    this.products = [...this.products, { id, ...product }];
    return { id, ...product };
  }

  async deleteProduct(id: number): Promise<IProduct | string> {
    const producto = this.products.find((product) => product.id === id);

    if (producto) return producto;

    return 'No se encontro el producto';
  }

  async updateProduct(id: number): Promise<IProduct | string> {
    const producto = this.products.find((product) => product.id === id);

    if (producto) return producto;

    return 'No se encontro el producto';
  }
}
