import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { Category } from 'src/categories/categories.entity';
import { OrderDetail } from 'src/orderDetails/orderDetails.entity';
import { Order } from 'src/orders/orders.entity';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env.development' });

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // autoLoadEntities: true,
    synchronize: true,
    logging: true,
    // dropSchema: true,
    // entities: ['dist/**/*.entity{.ts,.js}'],
    entities: [User, Product, Category, Order, OrderDetail],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
