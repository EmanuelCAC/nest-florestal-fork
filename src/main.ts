import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //para aplicar as validações do DTO:
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transforma tipos automaticamente
      whitelist: true, // remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // lanca erro se receber campos extras
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
