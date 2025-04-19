import { Todo } from 'libs/types';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AddTodoDTO } from './dto/add-todo.dto';
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

  updateTodo(id: string, todo: Partial<Todo>): Todo {
    const findTodo = this.todos.find((t) => t.id === id);
    if (!findTodo) {
      throw new NotFoundException('Todo Not Found');
    }
    this.todos = this.todos.map((t) => {
      if (t.id === id) {
        delete todo.id;
        const updateTodo = { ...t, ...todo };
        return updateTodo;
      }
      return t;
    });
    return findTodo;
  }
  deleteTodo(id: string): { message: string } {
    const todoIndex = this.todos.findIndex((t) => +t.id === +id);
    console.log(todoIndex);
    if (todoIndex === -1) {
      throw new NotFoundException('Todo not found');
    }
    this.todos.splice(todoIndex, 1);
    return { message: 'Todo delete successfully' };
  }
}
