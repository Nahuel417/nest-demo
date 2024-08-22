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
import { v4 as uuid } from 'uuid';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('varchar', { length: 50, nullable: false })
    name: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;

    @Column('integer', { nullable: false })
    stock: number;

    @Column('varchar', { default: 'urlAvatar' })
    imgUrl: string;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category_id: Category;

    @ManyToMany(() => OrderDetail)
    @JoinTable()
    orderDetails: OrderDetail[];
}
