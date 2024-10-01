import { LoginDTO } from 'dto/login.dto';

import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Post('')
  @UsePipes(new ValidationPipe())
  login(@Body('body') body: LoginDTO) {
    console.log(body);
    return 'OK';
  }
}
