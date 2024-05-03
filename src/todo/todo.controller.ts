import { Todo } from 'libs/types';

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todosService: TodoService) {}
  @Get()
  getTodos(): Todo[] {
    return this.todosService.todos;
  }
  @Get(':id')
  singleTodo(@Param('id') id: string): Todo {
    return this.todosService.getSingleTodo(id);
  }
  @Post()
  addTodo(@Body() todo: { title: string; description: string }): Todo {
    return this.todosService.addTodo(todo);
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() todo:  Partial<Todo>): Todo {
      return this.todosService.updateTodo(id, todo);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): {message:string} {
    return this.todosService.deleteTodo(id);
  }
}
