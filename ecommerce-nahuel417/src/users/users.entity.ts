import { Order } from 'src/orders/orders.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('varchar', { length: 50, nullable: false })
    name: string;

    @Column('varchar', { length: 50, nullable: false, unique: true })
    email: string;

    @Column('varchar', { length: 20, nullable: false })
    password: string;

    @Column('integer')
    phone: number;

    @Column('text')
    address: string;

    @Column('varchar', { length: 50, nullable: true })
    country: string;

    @Column('varchar', { length: 50, nullable: true })
    city: string;

    @ManyToOne(() => Order, (order) => order.user_id)
    @JoinColumn({ name: 'orders_id' })
    orders_id: Order;
}
