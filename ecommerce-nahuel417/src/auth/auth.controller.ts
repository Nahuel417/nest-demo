import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* GET *//
  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  //* POST *//
  @UseGuards(AuthGuard)
  @Post('signin')
  login(@Body() credentials: { email: string; password: string }) {
    const { email, password } = credentials;

    return this.authService.login(email, password);
  }
}
