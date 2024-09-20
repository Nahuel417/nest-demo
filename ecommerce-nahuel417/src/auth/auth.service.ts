import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    async signup(user: CreateUserDto): Promise<User> {
        const foundUser = await this.usersRepository.findByEmail(user.email);

        if (foundUser) {
            throw new BadRequestException('El usuario ya existe');
        }

        if (user.password !== user.confirmPassword)
            throw new BadRequestException('Las contraseñas no coinciden');

        return this.usersRepository.signup(user);
    }

    async signin(email: string, password: string) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new BadRequestException('Credenciales invalidas');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new BadRequestException('Credenciales invalidas');
        }

        const userPayload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        const token = this.jwtService.sign(userPayload);

        return {
            token,
            message: 'usuario logeado',
        };
    }
}
