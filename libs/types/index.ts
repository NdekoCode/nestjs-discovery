export interface Todo {
  id: number | string;
  title: string;
  isCompleted?: boolean;
  description: string;
}
export interface IUser {
  id?: number | string;
  name: string;
  email: string;
  createdAt?: string;
}
export type PartialTodo = Partial<Todo>;
