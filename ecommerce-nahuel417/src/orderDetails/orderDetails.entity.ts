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
import { v4 as uuid } from 'uuid';

@Entity('orderDetails')
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;

    @OneToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order_id: Order;

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[];
}
