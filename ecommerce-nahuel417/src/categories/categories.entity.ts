import { Product } from 'src/products/products.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('varchar', { length: 50, nullable: false })
    name: string;

    @OneToMany(() => Product, (product) => product.category_id)
    products: Product[];
}
