/**
 * Service responsible for managing user-related operations in the application.
 * Provides methods for creating, retrieving, updating, and removing user entities.
 */
import { Repository } from 'typeorm';

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const existingUser = this.userRepository.findOne({where:{email:user.email}})
    if(existingUser){
      throw new ConflictException("User Already exist")
    }
    return await this.userRepository.save(user);
  }

  /**
   * Retrieves all users from the database.
   * @returns {Promise<UserEntity[]>} An array of user entities or an empty array if no users are found.
   */
  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (!users) {
      return [];
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID #${id} is not found`);
    }
    const user =new UserEntity();
    const data  = Object.assign(existingUser, updateUserDto);
    console.log(`USER UPDATE ${id}`,data,updateUserDto)
    return await this.userRepository.save(data)
  }

  async remove(id: number) {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID #${id} is not found`);
    }
    return await this.userRepository.delete(id);
  }
}
