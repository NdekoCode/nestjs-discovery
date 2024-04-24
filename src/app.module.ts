import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [RecipeModule, IngredientModule],
  controllers: [AppController,BookController],
  providers: [AppService],
})
export class AppModule {}
