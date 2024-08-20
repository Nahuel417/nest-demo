import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './user.interface';
import { AuthGuard } from 'src/guards/auth.guard';
import { validateUser } from 'src/utils/validate';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //* GET *//
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get()
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    return this.usersService.getUsers(page, limit);
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
    if (validateUser(user)) return this.usersService.createUser(user);
    else return 'No es un usuario valido';
  }

  //* PUT *//
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUser: IUser) {
    return this.usersService.updateUser(+id, updateUser);
  }

  //* DELETE *//
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
