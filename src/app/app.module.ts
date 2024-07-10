import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, typeORMConfig, dataSource, jwtConfig } from './config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

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
      ): Promise<TypeOrmModuleOptions> => configService.getOrThrow('typeorm'),
      dataSourceFactory: async () => dataSource.initialize(),
    }),
    //JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => configService.getOrThrow('jwt'),
    }),
    //Auth
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
