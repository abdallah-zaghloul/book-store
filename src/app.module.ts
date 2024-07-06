import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, typeORMConfig, configuredDataSource } from './config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    //Config
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, typeORMConfig],
    }),
    //DB
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => configService.getOrThrow('typeorm'),
      dataSourceFactory: async () => await configuredDataSource.initialize(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
