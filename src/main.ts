import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from './app/exception-filter/http.exception-filter';
import { HttpResponseInterceptor } from './app/interceptor/http-response.interceptor';
import { AppConfig } from './app/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new HttpResponseInterceptor(),
  );

  app.useGlobalFilters(new HttpExceptionFilter(logger));
  await app.listen(configService.getOrThrow<AppConfig['port']>('app.port'));
}
bootstrap();
