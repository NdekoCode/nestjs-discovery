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
export type DBType = 'postgres' | 'mysql' | 'sqlite' | 'mariadb' | 'oracle' | 'mssql' | 'cockroachdb' | 'cordova' | 'nativescript' | 'react-native' | 'sqljs' | 'mongodb' | 'aurora-mysql' | 'aurora-postgres' | 'expo' | 'better-sqlite3' | 'capacitor' | 'spanner' | 'cordova';