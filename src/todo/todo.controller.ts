import { Request } from 'express';
import { Todo } from 'libs/types';
import { UpperAndMergePipe } from 'src/pipes/upper-and-merge/upper-and-merge.pipe';

import {
    Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req
} from '@nestjs/common';

import { AddTodoDTO } from './dto/add-todo.dto';
import { GetPaginatedTodoDTO } from './dto/get-paginated-todo.dto';
import { TodoService } from './todo.service';

// @UseInterceptors(DurationInterceptor) Isoler un interceptor pour qu'il soit utilisable uniquement sur les routes de ce controller
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getTodos(@Req() req: Request, @Query() query: GetPaginatedTodoDTO): Todo[] {
    let todos = this.todoService.todos;
    console.log('Query', query, query instanceof GetPaginatedTodoDTO);
    if (query) {
      console.log(
        'TODO QUERY.PAGE',
        typeof query.page,
        typeof query.limit,
        todos.slice(query.page),
      );

      todos = todos.slice(query.page).filter((_, index) => index < query.limit);
    }
    return todos;
  }

  @Get(':id')
  async singleTodo(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.getSingleTodo(id);
  }
  @Post()
  async addTodo(@Body() todo: AddTodoDTO) {
    return await this.todoService.addTodo(todo);
  }

  @Put(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: Partial<Todo>,
  ) {
    return this.todoService.updateTodo(id, todo);
  }

  @Delete(':id')
  async deleteTodo(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id: number,
  ): Promise<{ message: string }> {
    return await this.todoService.deleteTodo(id);
  }

  @Post('test-pipe')
  testPipe(@Body(UpperAndMergePipe) data) {
    return data;
  }
}
