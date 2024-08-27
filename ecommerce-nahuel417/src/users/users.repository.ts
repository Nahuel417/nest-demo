import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

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

    // async deleteUser(id: number): Promise<IUser> {
    //     const usuario = this.users.find((user) => user.id === id);

    //     return usuario;
    // }

    async login(email: string, password: string): Promise<User> {
        const usuario = await this.usersRepository.findOne({
            where: {
                email: email,
                password: password,
            },
        });

        return usuario;
    }
}
