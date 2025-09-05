import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const app_CONFIG = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Bilash Task API')
    .setDescription('API documentation for Bilash Task application')
    .setVersion('1.0')
    .addTag('requests', 'Operations with requests')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(app_CONFIG.get('APP_PORT') ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
