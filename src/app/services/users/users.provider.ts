import { DataSource } from 'typeorm';
import { User } from '../../../domain/users/entities/user.entity';

export const usersProvider = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
