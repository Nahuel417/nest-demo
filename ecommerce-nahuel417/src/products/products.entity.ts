import { ApiProperty } from '@nestjs/swagger';
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
    @ApiProperty({
        description: 'El id debe ser de tipo UUID',
        example: 'bd5fb850-2d66-4236-810f-3d2a29ad95s2',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'El nombre debe ser unico y como maximo 50 caracteres',
        example: 'Heladera',
    })
    @Column('varchar', { length: 50, nullable: false, unique: true })
    name: string;

    @ApiProperty({
        description: 'La descripcion es obligatorio',
        example:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut pellentesque neque, vitae condimentum diam. Vivamus egestas est eu vulputate iaculis. Fusce ut augue velit. Morbi semper sem et turpis faucibus, quis interdum nulla pellentesque. ',
    })
    @Column('text', { nullable: false })
    description: string;

    @ApiProperty({
        description:
            'El precio debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos',
        example: 230.25,
    })
    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;

    @ApiProperty({
        description: 'El stock debe ser un valor numérico',
        example: 23,
    })
    @Column('int', { nullable: false })
    stock: number;

    @ApiProperty({
        description: 'La imagen debe ser una direccion URL',
        example:
            'https://etzq49yfnmd.exactdn.com/wp-content/uploads/2022/03/cicero_gradient.png',
    })
    @Column('text', { default: 'urlAvatar' })
    imgUrl: string;

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    @JoinTable({ name: 'products_order_details' })
    orderDetails: OrderDetail[];

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category_id: Category;
}
