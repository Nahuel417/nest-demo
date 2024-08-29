import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesRepository {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) {}

    async uploadImage(id: string, file: Express.Multer.File) {
        const image = file.originalname;

        return `uploadImage con su id: ${id} y vino la imagen: ${image}`;
    }
}
