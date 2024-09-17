import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';

export class EditUserDto {
    @ApiProperty({
        description: 'El nombre debe tener entre 3 y 80 caracteres',
        example: 'nahuel',
    })
    @IsOptional()
    @IsString()
    @Length(3, 80)
    name: string;

    @ApiProperty({
        description: 'El email debe tener un formato valido',
        example: 'example@mail.com',
    })
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty({
        description:
            'La constraseña debe tener al menos: 1 mayuscula, 1 minuscula, 1 numero y 1 simbolo. Ademas debe tener entre 8 y 15 caracteres',
        example: 'Example1!',
    })
    @IsOptional()
    @IsString()
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @Length(8, 15)
    password: string;

    @ApiProperty({
        description: 'La direccion debe tener entre 3 y 80 caracteres',
        example: 'example230',
    })
    @IsOptional()
    @Length(3, 80)
    address: string;

    @ApiProperty({
        description: 'El telefono solo debe tener carácteres numericos',
        example: 234565674,
    })
    @IsOptional()
    @IsNumber()
    phone: number;

    @ApiProperty({
        description: 'El país debe tener entre 5 y 20 caracteres',
        example: 'Argentina',
    })
    @IsOptional()
    @IsString()
    @Length(5, 20)
    country: string;

    @ApiProperty({
        description: 'La ciudad debe tener entre 5 y 20 caracteres',
        example: 'Mar del Plata',
    })
    @IsOptional()
    @IsString()
    @Length(5, 20)
    city: string;

    @ApiProperty({
        description:
            'El rol debe ser un booleano. Tiene como valor default un "false"',
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    isAdmin: boolean;
}
