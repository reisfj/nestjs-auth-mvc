import { Module } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { UsersController } from '../../controllers/users/users.controller';
import { DatabaseModule } from 'src/infrastructure/database.module';
import { usersProvider } from '../../services/users/users.provider';

@Module({
  imports: [DatabaseModule.forRoot()],
  providers: [UsersService, ...usersProvider],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
