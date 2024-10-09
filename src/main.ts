import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DurationInterceptor } from './interceptors/duration/duration.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.get() nous permet de recuperer une instance d'un service d'un controller avec l'injection de dependance
  const configService  =app.get(ConfigService)
  
  const PORT = configService.get('APP_PORT');
  // app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform:true, // Permet que les données soient transformé(donc les donnees seront une instance de la DTO) en fonction des types déclaré dans la dto
      whitelist: true, // retire tout les champs qui ne sont pas déclaré dans la dto
      forbidNonWhitelisted: true, // rejette les requêtes qui contiennent des champs non déclaré dans la dto
    }),
  );
  
  app.useGlobalInterceptors(new DurationInterceptor())
  await app.listen(PORT, () => {
    console.log(`Server Start on ${PORT}`);
  });
}
bootstrap();
