import { Global, Logger, Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  appConfig,
  typeORMConfig,
  jwtConfig,
  dataSource,
  JwtConfig,
  TypeORMConfig,
} from './config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { BookStoreModule } from 'src/book-store/book-store.module';
import { HttpResponseInterceptor } from './interceptor/http-response.interceptor';

//AppModule (Mediator)
@Global()
@Module({
  imports: [
    //Config
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, typeORMConfig, jwtConfig],
    }),
    //DB
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> =>
        configService.getOrThrow<TypeORMConfig>(
          'typeorm',
        ) as TypeOrmModuleOptions,
      dataSourceFactory: async () => dataSource.initialize(),
    }),
    //JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> =>
        configService.getOrThrow<JwtConfig>('jwt'),
    }),
    //Auth
    AuthModule,
    //BookStore
    BookStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger, HttpResponseInterceptor],
  exports: [AuthModule],
})
export class AppModule {}
