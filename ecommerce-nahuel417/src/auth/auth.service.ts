import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  getAuth() {
    return 'Todos los auths';
  }

  login(email: string, password: string) {
    return this.usersRepository.login(email, password);
  }
}
