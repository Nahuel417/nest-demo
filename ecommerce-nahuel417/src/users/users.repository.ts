import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';

@Injectable()
export class UsersRepository {
    private users: IUser[] = [
        {
            id: 1,
            email: 'john.doe@example.com',
            name: 'John Doe',
            password: 'password123',
            address: '123 Main St',
            phone: '555-1234',
            country: 'USA',
            city: 'New York',
        },
        {
            id: 2,
            email: 'jane.smith@example.com',
            name: 'Jane Smith',
            password: 'securePass456',
            address: '456 Elm St',
            phone: '555-5678',
            country: 'Canada',
            city: 'Toronto',
        },
        {
            id: 3,
            email: 'mike.jones@example.com',
            name: 'Mike Jones',
            password: 'myPassword789',
            address: '789 Oak St',
            phone: '555-9876',
            country: 'Argentina',
            city: 'Forres',
        },
    ];

    async getUsers(page: number = 1, limit: number = 5): Promise<IUser[]> {
        const startIndex = (page - 1) * limit;

        return this.users.slice(startIndex, startIndex + limit);
    }

    async getUserById(id: number): Promise<IUser> {
        const usuario = this.users.find((user) => user.id === id);

        return usuario;
    }

    if(usuario) {
        return {
            id: usuario.id,
            email: usuario.email,
            name: usuario.name,
            address: usuario.address,
            password: '*******',
            phone: usuario.phone,
            country: usuario.country,
            city: usuario.city,
        };
    }

    async updateUser(
        id: number,
        updateUser: Omit<IUser, 'id'>,
    ): Promise<number | string> {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) return 'No se encontro el usuario';

        this.users[index].name = updateUser.name;
        this.users[index].email = updateUser.email;
        this.users[index].address = updateUser.address;
        this.users[index].password = updateUser.password;
        this.users[index].city = updateUser.city;
        this.users[index].country = updateUser.country;

        return this.users[index].id;
    }

    async deleteUser(id: number): Promise<IUser> {
        const usuario = this.users.find((user) => user.id === id);

        return usuario;
    }

    async login(email: string): Promise<IUser> {
        const usuario = this.users.find((user) => user.email === email);

        return usuario;
    }
}
