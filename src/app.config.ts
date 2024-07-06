import { IsInt, validateSync } from 'class-validator';

function validConfig<T extends new (...args: any[]) => any>(
  ConfigClass: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  const instance = new ConfigClass(...args);
  const errors = validateSync(instance, { skipMissingProperties: false });
  if (errors.length > 0) throw new Error(errors.toString());
  return instance;
}

class AppConfig {
  @IsInt()
  port = Number(process.env.PORT);
}

export const appConfig = () => validConfig(AppConfig);
