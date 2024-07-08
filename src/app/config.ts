import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IsBoolean, IsInt, IsString, validateSync } from 'class-validator';
import { config as dotEnvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

//declare & fetch env path
dotEnvConfig();

//validate config
function validConfig<T extends new (...args: any[]) => any>(
  ConfigClass: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  const instance = new ConfigClass(...args);
  const errors = validateSync(instance, { skipMissingProperties: false });
  if (errors.length > 0) throw new Error(errors.toString());
  return { ...instance };
}

//appConfig
class AppConfig {
  @IsInt()
  port = Number(process.env.PORT);
}

//typeORMConfig
class TypeORMConfig {
  type = 'postgres';

  entities = ['dist/**/*.entity{.ts,.js}'];

  migrations = ['dist/app/database/*{.ts,.js}'];

  autoLoadEntities = true;

  @IsString()
  host = process.env.DB_HOST;

  @IsInt()
  port = Number(process.env.DB_PORT);

  @IsString()
  username = process.env.DB_USER;

  @IsString()
  password = process.env.DB_PASSWORD;

  @IsString()
  database = process.env.DB_NAME;

  @IsBoolean()
  synchronize = Boolean(process.env.DB_SYNC);
}

//validation
const validAppConfig: AppConfig = validConfig(AppConfig);
const validTypeORMConfig: TypeOrmModuleOptions = validConfig(
  TypeORMConfig,
) as TypeOrmModuleOptions;

//reg & exports
export const appConfig = registerAs('app', () => validAppConfig);
export const typeORMConfig = registerAs('typeorm', () => validTypeORMConfig);
export const dataSource = new DataSource(
  validTypeORMConfig as DataSourceOptions,
);
