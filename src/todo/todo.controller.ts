import { Request } from 'express';
import { Todo } from 'libs/types';
import { UpperAndMergePipe } from 'src/pipes/upper-and-merge/upper-and-merge.pipe';

import {
    Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req
} from '@nestjs/common';

import { AddTodoDTO } from './dto/add-todo.dto';
import { GetPaginatedTodoDTO } from './dto/get-paginated-todo.dto';
import { TodoService } from './todo.service';

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
  singleTodo(@Param('id', ParseIntPipe) id: string): Todo {
    return this.todoService.getSingleTodo(id);
  }
  @Post()
  addTodo(@Body() todo: AddTodoDTO): Todo {
    return this.todoService.addTodo(todo);
  }

  @Put(':id')
  updateTodo(
    @Param('id', ParseIntPipe) id: string,
    @Body() todo: Partial<Todo>,
  ): Todo {
    return this.todoService.updateTodo(id, todo);
  }

  @Delete(':id')
  deleteTodo(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id: string,
  ): { message: string } {
    return this.todoService.deleteTodo(id);
  }

  @Post('test-pipe')
  testPipe(@Body(UpperAndMergePipe) data){
    return data
  }
}
