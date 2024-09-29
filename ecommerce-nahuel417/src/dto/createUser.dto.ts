import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'El nombre debe tener entre 3 y 80 caracteres',
        required: true,
        example: 'nahuel',
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;

    @ApiProperty({
        description: 'El email debe tener un formato valido',
        required: true,
        example: 'example@mail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description:
            'La constraseña debe tener al menos: 1 mayuscula, 1 minuscula, 1 numero y 1 simbolo. Ademas debe tener entre 8 y 15 caracteres',
        required: true,
        example: 'Example1!',
    })
    @IsNotEmpty()
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
        description: 'Debe volver a escribir la contraseña',
        required: true,
        example: 'Example1!',
    })
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;

    @ApiProperty({
        description: 'La direccion debe tener entre 3 y 80 caracteres',
        required: true,
        example: 'example230',
    })
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    address: string;

    @ApiProperty({
        description: 'El telefono solo debe tener carácteres numericos',
        required: true,
        example: 234565674,
    })
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @ApiProperty({
        description:
            'El país debe tener entre 5 y 20 caracteres. Este campo es opcional',
        required: false,
        example: 'Argentina',
    })
    @IsOptional()
    @IsString()
    @Length(5, 20)
    country: string;

    @ApiProperty({
        description:
            'La ciudad debe tener entre 5 y 20 caracteres. Este campo es opcional',
        required: false,
        example: 'Mar del Plata',
    })
    @IsOptional()
    @IsString()
    @Length(5, 20)
    city: string;

    @ApiProperty({
        description:
            'El rol debe ser un booleano. Tiene como valor default un "false"',
        required: false,
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    isAdmin?: boolean;
}
