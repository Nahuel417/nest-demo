import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersDbService } from './usersDb.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, UsersDbService],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(LoggerMiddleware).forRoutes('users');
    }
}
