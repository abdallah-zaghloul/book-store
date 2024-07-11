import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    return next.handle().pipe(
      map((data) => {
        response.status(200); //for default statusCode 200
        return {
          status: true,
          statusCode: response.statusCode,
          message: response.statusMessage,
          data: data,
        };
      }),
    );
  }
}
{
}
