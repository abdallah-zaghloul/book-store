import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../config';

@Injectable()
export class ParseQueryParams implements PipeTransform {
  constructor(private configService: ConfigService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type == 'query') {
      this.toInteger(
        value,
        {
          key: 'take',
          defaultValue: this.configService.get<AppConfig['paginationCount']>(
            'app.paginationCount',
          )!,
        },
        { key: 'skip', defaultValue: 0 },
      );
    }

    return value;
  }

  private toInteger(
    value: any,
    ...params: { key: string; defaultValue: number }[]
  ) {
    params.forEach(({ key, defaultValue }) => {
      const parsed = parseInt(value[key], 10);
      const isNotInteger = isNaN(parsed) || parsed < 0;
      value[key] = isNotInteger ? defaultValue : parsed;
    });
  }
}
