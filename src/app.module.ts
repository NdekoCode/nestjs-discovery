import { DB_CONFIG } from 'libs/constants/config/db';

import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { LoginController } from './login/login.controller';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { logger } from './middlewares/first/logger.middleware';
import { RecipeModule } from './recipe/recipe.module';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DB_CONFIG),
    RecipeModule,
    IngredientModule,
    TodoModule,
    UserModule,
    BookModule
  ],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirstMiddleware)
      .forRoutes(TodoController)
      .apply(logger)
      .forRoutes('');
    MorganMiddleware.configure('dev');
    consumer.apply(MorganMiddleware).forRoutes('');
    consumer.apply(HelmetMiddleware).forRoutes('');
  }
}
