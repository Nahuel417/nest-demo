import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';

@Injectable()
export class minSizeValidatorPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const minSize = 10000;

        if (value.size < minSize)
            throw new BadRequestException('El archivo es demasiado liviano.');

        return value;
    }
}
