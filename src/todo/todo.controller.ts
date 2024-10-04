import { Request } from 'express';
import { Todo } from 'libs/types';

import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';

import { AddTodoDTO } from './dto/add-todo.dto';
import { GetPaginatedTodoDTO } from './dto/get-paginated-todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getTodos(@Req() req: Request,@Query() query:GetPaginatedTodoDTO): Todo[] {
    console.log(req);
    let todos = this.todoService.todos;
    if(query && query.page){
      todos = todos.slice(query.page,query.limit).filter((_,index)=>index<=query.limit);
    }
     return todos;
  }

  @Get(':id')
  singleTodo(@Param('id') id: string): Todo {
    return this.todoService.getSingleTodo(id);
  }
  @Post()
  addTodo(@Body() todo:AddTodoDTO): Todo {
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
