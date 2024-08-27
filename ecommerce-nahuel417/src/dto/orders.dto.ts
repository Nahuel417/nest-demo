import { Product } from 'src/products/products.entity';

export class OrdersDto {
    userId: string;
    products: Partial<Product[]>;
}
