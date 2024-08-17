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

  async getUsers(): Promise<IUser[]> {
    const usuarios = this.users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      password: '*******',
      phone: user.phone,
      country: user.country,
      city: user.city,
    }));

    return usuarios;
  }

  async getUserById(id: number): Promise<IUser | string> {
    const usuario = this.users.find((user) => user.id === id);

    if (usuario) {
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

    return 'No se encontro el usuario';
  }

  async createUser(user: Omit<IUser, 'id'>): Promise<IUser> {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return { id, ...user };
  }

  async updateUser(id: number): Promise<IUser | string> {
    const usuario = this.users.find((user) => user.id === id);
    if (usuario) return usuario;

    return 'Usuario no encontrado';
  }

  async deleteUser(id: number): Promise<IUser | string> {
    const usuario = this.users.find((user) => user.id === id);
    if (usuario) return usuario;

    return 'Usuario no encontrado';
  }

  async login(email: string, password: string) {
    const usuario = this.users.find(
      (user) => user.email === email && user.password === password,
    );

    if (usuario) {
      return 'Usuario Logeado';
    }

    // // throw Error('Email o password incorrectos');
    return 'Email o password incorrectos';
  }
}
