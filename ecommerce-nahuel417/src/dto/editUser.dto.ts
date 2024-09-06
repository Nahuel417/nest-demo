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
    @IsOptional()
    @IsString()
    @Length(3, 80)
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

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

    @IsOptional()
    @Length(3, 80)
    address: string;

    @IsOptional()
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

    @IsOptional()
    @IsBoolean()
    isAdmin: boolean;
}
