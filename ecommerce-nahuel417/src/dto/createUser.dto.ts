import { PickType } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

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

    @IsNotEmpty()
    @Length(3, 80)
    address: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsOptional()
    @IsString()
    @Length(5, 20)
    country: string;

    @IsOptional()
    @IsString()
    @Length(5, 20)
    city: string;
}
