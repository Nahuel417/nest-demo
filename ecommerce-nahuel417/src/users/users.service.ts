import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/products/products.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }
}
