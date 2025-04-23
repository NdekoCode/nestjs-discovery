import { Todo } from 'libs/types';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AddTodoDTO } from './dto/add-todo.dto';
import { UpdateTodoDTO } from './dto/update-doto.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'Learn Nest.js',
      description: 'Nest.js is very important',
      isCompleted: false,
    },
  ];
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
  getTodos(): Todo[] {
    return this.todos;
  }
  async getSingleTodo(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo Not Found');
    }
    return todo;
  }

  async addTodo(todo: AddTodoDTO) {
    const newTodos = this.todoRepository.create(todo);
    return await this.todoRepository.save(newTodos);
  }

  async updateTodo(id: number, todo: Partial<UpdateTodoDTO>) {
    const findTodo = await this.getSingleTodo(id);
    if (!findTodo) {
      throw new NotFoundException('Todo Not Found');
    }
    const updatedTodo = Object.assign(findTodo,todo)
    console.log("UPDATED TODO",updatedTodo)
    return await this.todoRepository.save(updatedTodo);
  
  }
  async deleteTodo(id: number){
    const findTodo = this.getSingleTodo(id);
    if (!findTodo) {
      throw new NotFoundException('Todo not found');
    }
   return await this.todoRepository.delete(id);
  }
}
