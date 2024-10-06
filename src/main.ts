import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      transform:true, // Permet que les données soient transformé(donc les donnees seront une instance de la DTO) en fonction des types déclaré dans la dto
      whitelist: true, // retire tout les champs qui ne sont pas déclaré dans la dto
      forbidNonWhitelisted: true, // rejette les requêtes qui contiennent des champs non déclaré dans la dto
    }),
  );
  await app.listen(PORT, () => {
    console.log(`Server Start on ${PORT}`);
  });
}
bootstrap();
