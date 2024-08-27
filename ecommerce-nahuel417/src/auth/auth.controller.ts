import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //* GET *//
    @Get()
    getAuth() {
        return this.authService.getAuth();
    }

    //* POST *//
    @Post('signin')
    login(@Body() credentials: LoginUserDto) {
        const { email, password } = credentials;

        return this.authService.login(email, password);
    }
}
