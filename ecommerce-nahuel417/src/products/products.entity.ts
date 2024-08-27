import { Category } from 'src/categories/categories.entity';
import { OrderDetail } from 'src/orderDetails/orderDetails.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 50, nullable: false, unique: true })
    name: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;

    @Column('int', { nullable: false })
    stock: number;

    @Column('text', { default: 'urlAvatar' })
    imgUrl: string;

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    @JoinTable({ name: 'products_order_details' })
    orderDetails: OrderDetail[];

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category_id: Category;
}
