import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    getUsers() {
        return this.usersRepository.getUsers();
    }

    getUserById(id: number) {
        return this.usersRepository.getUserById(id);
    }

    createUser(user: Omit<IUser, 'id'>): Promise<IUser> {
        return this.usersRepository.createUser(user);
    }

    updateUser(id: number) {
        return this.usersRepository.updateUser(id);
    }

    deleteUser(id: number) {
        return this.usersRepository.deleteUser(id);
    }
}
