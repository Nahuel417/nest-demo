import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async getUsers(
        page: number,
        limit: number,
    ): Promise<Omit<User, 'password'>[]> {
        const allUsers = await this.usersRepository.getUsers(page, limit);

        return allUsers.map(({ password, ...rest }) => rest);
    }

    async getUserById(id: string): Promise<Omit<User, 'password'> | string> {
        const user = await this.usersRepository.getUserById(id);
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const { password, ...rest } = user;

        return rest;
    }

    async createUser(user: Partial<User>): Promise<Partial<User> | string> {
        const usuario = await this.usersRepository.createUser(user);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const { password, ...rest } = usuario;

        return rest;
    }

    async updateUser(id: string, updateUser: User): Promise<string> {
        const user = await this.usersRepository.updateUser(id, updateUser);

        return user;
    }

    // async deleteUser(id: number): Promise<number | string> {
    //     const usuario = await this.usersRepository.deleteUser(id);
    //     if (!usuario) return 'No se encontro el usuario';

    //     return usuario.id;
    // }
}
