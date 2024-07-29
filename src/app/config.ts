import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsInt,
  ValidateNested,
  validateSync,
  IsNotEmptyObject,
  Min,
} from 'class-validator';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { config as dotEnvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SignOptions } from 'jsonwebtoken';
import { JwtModuleOptions } from '@nestjs/jwt';

//declare & fetch env path
dotEnvConfig();

//instantiate config instance
function toConfig<T extends new () => InstanceType<T>>(
  configClass: T,
  options?: ClassTransformOptions,
): InstanceType<T> {
  return plainToInstance(configClass, {}, options);
}

//validate config
function validConfig<T extends new () => InstanceType<T>>(
  configClass: T,
): InstanceType<T> {
  const config = toConfig(configClass);
  const errors = validateSync(config as object, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());
  return config;
}

//appConfig
export class AppConfig {
  @IsNotEmpty()
  @IsInt()
  port: number = Number(process.env.PORT);

  @IsNotEmpty()
  @IsInt()
  paginationCount: number = Number(process.env.PAGINATION_COUNT);
}

//typeORMConfig
export class TypeORMConfig {
  type: string = 'postgres';

  entities: string[] = ['dist/**/*.entity{.ts,.js}'];

  migrations: string[] = ['dist/app/database/*{.ts,.js}'];

  autoLoadEntities: boolean = true;

  @IsNotEmpty()
  @IsString()
  host: string = process.env.DB_HOST!;

  @IsNotEmpty()
  @IsInt()
  port: number = Number(process.env.DB_PORT);

  @IsNotEmpty()
  @IsString()
  username: string = process.env.DB_USER!;

  @IsNotEmpty()
  @IsString()
  password: string = process.env.DB_PASSWORD!;

  @IsNotEmpty()
  @IsString()
  database: string = process.env.DB_NAME!;

  @IsBoolean()
  synchronize: boolean = Boolean(process.env.DB_SYNC); //default false
}

class JwtSignOptions implements SignOptions {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  expiresIn: number = Number(process.env.JWT_EXPIRES_IN);
}
export class JwtConfig implements JwtModuleOptions {
  @IsNotEmpty()
  @IsString()
  secret: string = process.env.JWT_SECRET!;

  @IsNotEmptyObject()
  @ValidateNested()
  signOptions: JwtSignOptions = toConfig(JwtSignOptions);
}

//validation
const validAppConfig: AppConfig = validConfig(AppConfig);
const validTypeORMConfig = validConfig(TypeORMConfig) as TypeOrmModuleOptions;
const validJWTConfig: JwtModuleOptions = validConfig(JwtConfig);

//register
export const appConfig = registerAs('app', () => validAppConfig);
export const typeORMConfig = registerAs('typeorm', () => validTypeORMConfig);
export const jwtConfig = registerAs('jwt', () => validJWTConfig);
export const dataSource = new DataSource(
  validTypeORMConfig as DataSourceOptions,
);
