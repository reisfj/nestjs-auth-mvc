import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Public } from '../../decorators/public.decorator';
import { RegisterDto } from '../../../domain/auth/dtos/register.dto';
import { User } from '../../../domain/users/entities/user.entity';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Public()
  @Post()
  async create(@Body() createUserDto: RegisterDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
