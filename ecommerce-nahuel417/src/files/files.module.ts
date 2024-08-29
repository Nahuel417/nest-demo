import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesRepository } from './files.repository';
import { Product } from 'src/products/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from 'src/config/cloudinary';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [FilesController],
    providers: [FilesService, FilesRepository, CloudinaryConfig],
})
export class FilesModule {}
