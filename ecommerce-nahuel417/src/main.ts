import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            exceptionFactory: (errors) => {
                const cleanErrors = errors.map((error) => {
                    return {
                        property: error.property,
                        constraints: error.constraints,
                    };
                });

                return new BadRequestException({
                    alert: 'Se han detectado los siguientes errores: ',
                    errors: cleanErrors,
                });
            },
        }),
    );
    app.use(loggerGlobal);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Modulo 4')
        .setDescription('Demo nestJs')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
