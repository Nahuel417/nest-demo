import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
    constructor(private usersRepository: UsersRepository) {}

    getAuth(): string {
        return 'Todos los auths';
    }

    async login(email: string, password: string): Promise<string> {
        const user = await this.usersRepository.login(email, password);
        if (!user) throw new BadRequestException('Crendenciales invalidas');

        return 'Usuario Logeado';
    }
}
