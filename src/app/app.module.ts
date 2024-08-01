import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './controllers/app.controller';
import { DatabaseModule } from '../infrastructure/database.module';
import { usersProvider } from './services/users/users.provider';
import { AuthService } from './services/auth/auth.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [...usersProvider, AuthService, JwtService],
})
export class AppModule {}
