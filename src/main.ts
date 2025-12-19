import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configurar CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Adicione outras origens se necessário
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  //para aplicar as validações do DTO:
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transforma tipos automaticamente
      whitelist: true, // remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // lanca erro se receber campos extras
    }),
  );

  await app.listen(process.env.PORT ?? 8787);
}
bootstrap();
