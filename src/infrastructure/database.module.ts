import { DynamicModule, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [...databaseProviders],
      exports: [...databaseProviders],
    };
  }
}
