import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  getAuth() {
    return 'Todos los auths';
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.usersRepository.login(email);
    if (!user || user?.password !== password)
      return 'Email o password incorrectos';

    return 'Usuario Logeado';
  }
}
