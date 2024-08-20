import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

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
  login(@Body('email') email: string, @Body('password') password: string) {
    if (!email || !password) return 'Email y password son requeridos';

    return this.authService.login(email, password);
  }
}
