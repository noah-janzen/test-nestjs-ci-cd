import { Injectable } from '@nestjs/common';

import { Environment, schema } from './environment';

@Injectable()
export class ConfigService {
  private readonly env: Environment;

  constructor() {
    this.env = schema.parse(process.env);
  }

  get<K extends keyof Environment>(key: K): Environment[K] {
    return this.env[key];
  }
}
