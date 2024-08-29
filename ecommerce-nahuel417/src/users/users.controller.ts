import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { validateUser } from 'src/utils/validate';
import { User } from './users.entity';
import { CreateUserDto } from 'src/dto/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

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
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUserById(id);
    }

    //* POST *//
    @HttpCode(201)
    @Post()
    createUser(@Body() user: CreateUserDto) {
        if (validateUser(user)) return this.usersService.createUser(user);
        else return 'No es un usuario valido';
    }

    //* PUT *//
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Patch(':id')
    updateUser(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUser: User,
    ) {
        return this.usersService.updateUser(id, updateUser);
    }

    // //* DELETE *//
    // @HttpCode(200)
    // @UseGuards(AuthGuard)
    // @Delete(':id')
    // deleteUser(@Param('id') id: string) {
    //     return this.usersService.deleteUser(+id);
    // }
}
