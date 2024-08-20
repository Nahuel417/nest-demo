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

  async getProducts(page: number = 1, limit: number = 5): Promise<IProduct[]> {
    const startIndex = (page - 1) * limit;

    return this.products.slice(startIndex, startIndex + limit);
  }

  async getProductById(id: number): Promise<IProduct> {
    const producto = this.products.find((product) => product.id === id);

    return producto;
  }

  async createProduct(product: Omit<IProduct, 'id'>) {
    const id = this.products.length + 1;
    this.products = [...this.products, { id, ...product }];
    return { id, ...product };
  }

  async updateProduct(
    id: number,
    updateProduct: Omit<IProduct, 'id'>,
  ): Promise<number | string> {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) return 'No se encontro el producto';

    this.products[index].description = updateProduct.description;
    this.products[index].name = updateProduct.name;
    this.products[index].imgUrl = updateProduct.imgUrl;
    this.products[index].price = updateProduct.price;
    this.products[index].stock = updateProduct.stock;

    return this.products[index].id;
  }

  async deleteProduct(id: number): Promise<IProduct> {
    const producto = this.products.find((product) => product.id === id);

    return producto;
  }
}
