import { Order } from 'src/orders/orders.entity';
import { Product } from 'src/products/products.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orderDetails')
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;

    @ManyToMany(() => Product)
    @JoinTable({ name: 'order_details_products' })
    products: Product[];

    @OneToOne(() => Order, (order) => order.orderDetails)
    @JoinColumn({ name: 'order_id' })
    order_id: Order;
}
