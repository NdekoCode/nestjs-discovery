import { Request, Response } from 'express';

import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FirstMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log("CALL THE FIRST MIDDLEWARE");
    next();
  }
}
