import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity
    
    )
    private readonly userRepository:Repository<UserEntity>){}
  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    const users = this.userRepository.find();
    if(!users){
      return [];
    }
    return users;
  }

  async findOne(id: number) {
   const user = await this.userRepository.findOne({where:{id}});
   if(!user){
    throw new NotFoundException("User not found");
   }
   return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.userRepository.update(user, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
