import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { IngredientModule } from './ingredient/ingredient.module';
import { LoginController } from './login/login.controller';
import { RecipeModule } from './recipe/recipe.module';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [RecipeModule, IngredientModule,TodoModule],
  controllers: [AppController, BookController,TodoController,LoginController],
  providers: [AppService, TodoService],
})
export class AppModule {}
