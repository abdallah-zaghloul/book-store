import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsNotEmptyClass(validationOptions?: ValidationOptions) {
  return function (target: new (...args: any[]) => any) {
    //@ts-expect-error we doesn't need a propertyName option because we apply at the class level
    registerDecorator({
      name: 'isNotEmptyClass',
      target: target,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const dto = args.object as Record<string, any>;
          // Check if at least one property is defined and not null or empty string
          return Object.values(dto).some(
            (value) => value !== undefined && value !== null && value !== '',
          );
        },
        defaultMessage(args: ValidationArguments) {
          return 'At least one property must be provided.';
        },
      },
    });
  };
}
