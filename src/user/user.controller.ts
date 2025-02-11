import { Request, Response } from 'express';
import { IUser } from 'libs/types';

import {
  Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Req, Res
} from '@nestjs/common';

import { UserDto } from './dto/add-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAll(@Req() req: Request, @Res() res: Response) {
    console.log(req);
   return res.status(HttpStatus.OK).json(this.userService.getAll() || []);
  }

  @Post()
  addUser(@Body() user: UserDto) {
    return this.userService.addUser(user);
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Partial<IUser>,
  ) {
    return this.userService.updateUser(id, user);
  }
}
