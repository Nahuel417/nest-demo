import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/loginUser.dto';
import { CreateUserDto } from 'src/dto/createUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //* POST *//

    @HttpCode(201)
    @Post('signup')
    signup(@Body() user: CreateUserDto) {
        return this.authService.signup(user);
    }

    @HttpCode(201)
    @Post('signin')
    signin(@Body() credentials: LoginUserDto) {
        const { email, password } = credentials;
        return this.authService.signin(email, password);
    }
}
