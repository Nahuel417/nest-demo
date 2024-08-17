import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './user.interface';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //* GET *//
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  //* POST *//
  @HttpCode(201)
  @Post()
  createUser(@Body() user: IUser) {
    return this.usersService.createUser(user);
  }

  //* PUT *//
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string) {
    return this.usersService.updateUser(+id);
  }

  //* DELETE *//
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
