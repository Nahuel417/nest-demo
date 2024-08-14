import { Injectable } from '@nestjs/common';

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
}
