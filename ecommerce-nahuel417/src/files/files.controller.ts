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
    UseGuards,
    UseInterceptors,
    UsePipes,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { minSizeValidatorPipe } from 'src/pipes/minSizeValidator.pipe';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('files ')
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @ApiBearerAuth()
    @Post('uploadImage/:id')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    @UsePipes(minSizeValidatorPipe)
    uploadImage(
        @Param('id', ParseUUIDPipe) productId: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 20000,
                        message: 'El archivo es demasiado pesado',
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp)$/,
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        return this.filesService.uploadImage(productId, file);
    }
}
