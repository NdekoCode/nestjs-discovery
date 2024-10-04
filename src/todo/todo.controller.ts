import { Request } from 'express';
import { Todo } from 'libs/types';

import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';

import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getTodos(@Req() req: Request): Todo[] {
    console.log(req);
     return this.todoService.todos
  }
  @Get(':id')
  singleTodo(@Param('id') id: string): Todo {
    return this.todoService.getSingleTodo(id);
  }
  @Post()
  addTodo(@Body() todo: { title: string; description: string }): Todo {
    return this.todoService.addTodo(todo);
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() todo: Partial<Todo>): Todo {
    return this.todoService.updateTodo(id, todo);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): { message: string } {
    return this.todoService.deleteTodo(id);
  }
}
