import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from 'src/dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async getUsers(page: number = 1, limit: number = 5): Promise<User[]> {
        const users = await this.usersRepository.find({
            skip: (page - 1) * limit,
            take: limit,
        });

        return users;
    }

    async getUserById(id: string): Promise<User | null> {
        const usuario = await this.usersRepository.findOneBy({ id });

        return usuario;
    }

    async createUser(user: Partial<User>): Promise<User> {
        const newUser = this.usersRepository.create(user);
        await this.usersRepository.save(newUser);

        return newUser;
    }

    async updateUser(id: string, updateUser: User): Promise<string> {
        const usuario = await this.usersRepository.findOneBy({ id });
        if (!usuario) throw new NotFoundException('Usuario no encontrado');

        Object.assign(usuario, updateUser);
        await this.usersRepository.save(usuario);

        return usuario.id;
    }

    async deleteUser(id: string): Promise<User> {
        const usuario = await this.usersRepository.findOneBy({ id });

        return usuario;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { email } });

        return user;
    }

    async signup(user: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 7);

        if (!hashedPassword) {
            throw new BadRequestException('Error en el hash de la contraseña');
        }

        const newUser = this.usersRepository.create({
            ...user,
            password: hashedPassword,
        });

        await this.usersRepository.save(newUser);

        const usuario = await this.usersRepository.findOne({
            where: { email: user.email },
            select: [
                'id',
                'name',
                'address',
                'city',
                'country',
                'email',
                'phone',
                'isAdmin',
            ],
        });

        return usuario;
    }
}
