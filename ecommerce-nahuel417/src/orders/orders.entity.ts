import { OrderDetail } from 'src/orderDetails/orderDetails.entity';
import { User } from 'src/users/users.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date')
    date: Date;

    @ManyToOne(() => User, (user) => user.orders_id)
    @JoinColumn({ name: 'user_id' })
    user_id: User;

    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order_id)
    @JoinColumn({ name: 'order_detail_id' })
    orderDetails: OrderDetail;
}
