import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [RecipeModule, IngredientModule],
  controllers: [AppController, BookController,TodoController],
  providers: [AppService, TodoService],
})
export class AppModule {}
