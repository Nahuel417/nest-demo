import { OrderDetail } from 'src/orderDetails/orderDetails.entity';
import { User } from 'src/users/users.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('date')
    date: string;

    @OneToMany(() => User, (user) => user.orders_id)
    @JoinColumn({ name: 'user_id' })
    user_id: User;

    @OneToOne(() => OrderDetail)
    @JoinColumn({ name: 'orderDetails' })
    orderDetails: OrderDetail;
}
