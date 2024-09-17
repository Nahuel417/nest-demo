import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/products/products.entity';

export class createrOrderDto {
    @ApiProperty({
        description: 'El id debe ser de tipo UUID',
        example: 'bd5fb850-2d66-4236-810f-3d2a29ad95s2',
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        description:
            'El array de productos debe tener al menos 1 producto que será un objeto con su respectivo id',
        example: [
            {
                id: 'a7474a88-fead-4d38-a3df-a35b346a0f4e',
            },
            {
                id: 'b1afe83b-835f-4a6a-9a2e-780a6f19bfab',
            },
        ],
    })
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Product[]>;
}
