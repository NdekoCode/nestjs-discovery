import { IUser } from 'libs/types';

import {
    BadRequestException, ConflictException, Injectable, NotFoundException
} from '@nestjs/common';

@Injectable()
export class UserService {
  private users: IUser[] = [
    { id: 1, name: 'John', email: 'john@gmail.com' },
    { id: 2, name: 'Jane', email: 'jane@gmail.com' },
    { id: 3, name: 'Doe', email: 'doe@gmail.com' },
  ];
  getAll() {
    return this.users;
  }
  addUser(user: IUser): IUser {
    if (!user) {
      throw new BadRequestException('User is required');
    }
    const userExist = this.users.find(
      (u) => u.name === user.name && user.email === u.email,
    );
    if (userExist) {
      throw new ConflictException('User Already exist');
    }
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }
  deleteUser(id: number): IUser {
    const userExist = this.users.find((u) => u.id === id);
    if (!userExist) {
      throw new NotFoundException('User Not Exist');
    }
    this.users = this.users.filter((u) => u.id !== id);
    return userExist;
  }
  getUser(id: number): IUser {
    const userExist = this.users.find((u) => u.id === id);
    if (!userExist) {
      throw new NotFoundException('User Not Exist');
    }
    return userExist;
  }
  updateUser(id: number, user: Partial<IUser>) {
    const userExist = this.users.find((u) => u.id === id);
    if (!userExist) {
      throw new NotFoundException('User Not Exist');
    }
    const updatedUser = { ...userExist, ...user, id: userExist.id };
    this.users = this.users.map((u) => (u.id === id ? updatedUser : u));
    return updatedUser;
  }
}
