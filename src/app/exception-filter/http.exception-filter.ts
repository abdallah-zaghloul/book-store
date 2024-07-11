import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    const details = exception.getResponse() as any;

    //server side log
    this.logger.error(
      `${request.method} ${request.originalUrl} ${statusCode} error:${exception.message}`,
    );

    //extract res props
    let message: string;
    let errors: [] | undefined;

    if (details instanceof Object) {
      message =
        details.message instanceof String ? details.message : details.error;
      message ??= details.message;

      details.message instanceof Array && (errors = details.message);
    } else {
      message = details;
    }

    //prepare res shape
    const resBody: any = {
      status: false,
      statusCode,
      message,
    };

    response.status(statusCode).json(errors ? { ...resBody, errors } : resBody);
  }
}
