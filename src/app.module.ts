import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { IngredientModule } from './ingredient/ingredient.module';
import { LoginController } from './login/login.controller';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { logger } from './middlewares/first/logger.middleware';
import { RecipeModule } from './recipe/recipe.module';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RecipeModule,
    IngredientModule,
    TodoModule,
  ],
  controllers: [AppController, BookController, TodoController, LoginController],
  providers: [AppService, TodoService],
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
