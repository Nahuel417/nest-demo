import { Order } from 'src/orders/orders.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 50, nullable: false })
    name: string;

    @Column('varchar', { length: 50, nullable: false, unique: true })
    email: string;

    @Column('varchar', { length: 100, nullable: false })
    password: string;

    @Column('int')
    phone: number;

    @Column('text')
    address: string;

    @Column('varchar', { length: 50, nullable: true })
    country: string;

    @Column('varchar', { length: 50, nullable: true })
    city: string;

    @Column('boolean', { default: false })
    isAdmin: boolean;

    @OneToMany(() => Order, (order) => order.user_id)
    @JoinColumn({ name: 'orders_id' })
    orders_id: Order[];
}
