export interface Todo {
  id: number | string;
  title: string;
  isCompleted?: boolean;
  description: string;
}
export type PartialTodo = Partial<Todo>;
