import { Product } from 'src/products/products.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 50, nullable: false })
    name: string;

    @OneToMany(() => Product, (product) => product.category_id)
    @JoinColumn({ name: 'product_id' })
    products: Product[];
}
