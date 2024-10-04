import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { LoginDTO } from './dto/login.dto';

@Controller('login')
export class LoginController {
  @Post('')
  @UsePipes(new ValidationPipe())
  login(@Body('body') body: LoginDTO) {
    console.log(body);
    return 'OK';
  }
}
