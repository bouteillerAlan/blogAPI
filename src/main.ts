import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RootModule, {cors: true});

  // Use global validation pipes, for all requests using DTO.
  app.useGlobalPipes(new ValidationPipe({transform: true}));

  await app.listen(3001);
}
bootstrap();
