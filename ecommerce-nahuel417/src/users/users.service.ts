import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<IUser, 'password'>[]> {
    const allUsers = await this.usersRepository.getUsers(page, limit);

    return allUsers.map(({ password, ...rest }) => rest);
  }

  async getUserById(id: number): Promise<Omit<IUser, 'password'> | string> {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      return 'Usuario no encontrado';
    }

    const { password, ...rest } = user;

    return rest;
  }

  async createUser(user: Omit<IUser, 'id'>): Promise<IUser> {
    const usuario = await this.usersRepository.createUser(user);

    return usuario;
  }

  async updateUser(id: number, updateUser: IUser): Promise<string | number> {
    const user = await this.usersRepository.updateUser(id, updateUser);

    return user;
  }

  async deleteUser(id: number): Promise<number | string> {
    const usuario = await this.usersRepository.deleteUser(id);
    if (!usuario) return 'No se encontro el usuario';

    return usuario.id;
  }
}
