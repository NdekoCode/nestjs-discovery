import { Todo } from 'libs/types';

import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TodoService {
  todos: Todo[] = [];
  getTodos(): Todo[] {
    return this.todos;
  }
  getSingleTodo(id: string) {
    const todo = this.todos.find((t) => t.id == id);
    if (!todo) {
      throw new NotFoundException('Todo Not Found');
    }
    return todo;
  }

  addTodo(todo: { title: string; description: string }): Todo {
    const newTodos: Todo = { ...todo, isCompleted: false, id: Date.now() };
    this.todos.push(newTodos);
    return newTodos;
  }

  updateTodo(id: string, todo: Todo): Todo {
    const todoIndex = this.todos.findIndex((t) => t.id === id);
    if (!todoIndex) {
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
    return this.todos[todoIndex];
  }
  deleteTodo(id: string) {
    const todoIndex = this.todos.findIndex((t) => t.id === id);
    if (!todoIndex) {
      throw new NotFoundException('Todo not found');
    }
    this.todos.splice(todoIndex, 1);
    return 'Todo delete successfully';
  }
}
