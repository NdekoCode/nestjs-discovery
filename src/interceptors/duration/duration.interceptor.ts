import { Observable, tap } from 'rxjs';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn = Date.now();
    console.log(`Request start at: ${new Date(dateIn)}`);
    console.log('In a interceptor')
    return next.handle().pipe(tap(()=>{
      const dateOut = Date.now();
      console.log(`Request end at: ${new Date(dateOut)}`);
      console.log(`Duration: ${dateOut - dateIn} ms`);
    }));
  }
}
