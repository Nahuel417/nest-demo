import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users = [
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

  async getUsers() {
    return this.users;
  }
}
