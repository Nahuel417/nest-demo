import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
    constructor(
        private readonly filesRepository: FilesRepository,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) {}

    async uploadImage(productId: string, file: Express.Multer.File) {
        console.log(file);

        const product = await this.productsRepository.findOneBy({
            id: productId,
        });

        if (!product) throw new NotFoundException('El producto no existe');

        const uploadedImage = await this.filesRepository.uploadImage(file);

        await this.productsRepository.update(productId, {
            imgUrl: uploadedImage.secure_url,
        });

        const updatedProduct = await this.productsRepository.findOneBy({
            id: productId,
        });

        return updatedProduct;
    }
}
