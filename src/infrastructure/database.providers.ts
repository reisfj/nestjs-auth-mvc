import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        url: process.env.MONGO_CONNECTION,
        synchronize: false,
        logging: 'all',
        entities: ['dist/**/*.entity{.ts,.js}'],
      });

      await dataSource.initialize();
      return dataSource;
    },
  },
];
