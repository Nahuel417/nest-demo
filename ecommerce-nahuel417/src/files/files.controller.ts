import {
    Controller,
    FileTypeValidator,
    HttpCode,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    ParseUUIDPipe,
    Post,
    UploadedFile,
    UseInterceptors,
    UsePipes,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { minSizeValidatorPipe } from 'src/pipes/minSizeValidator.pipe';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @HttpCode(200)
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(minSizeValidatorPipe)
    @Post('uploadImage/:id')
    uploadImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 100000,
                        message: 'El archivo es demasiado pesado',
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp)$/,
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        return this.filesService.uploadImage(id, file);
    }
}
