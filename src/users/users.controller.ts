import { Controller, Get, Post, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../decorators/public.decorator';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { CreateUserPayload } from '../users/dtos/create-user.payload';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<User[]> {
        console.log('GET /api/users accessed');
        return this.usersService.findAll();
    }

    @Public()
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password !== createUserDto.confirmPassword) {
            throw new BadRequestException('As senhas não coincidem');
        }

        
        const userData: CreateUserPayload = {
            fullName: createUserDto.fullName,
            email: createUserDto.email,
            password: createUserDto.password,
            address: createUserDto.address,
            city: createUserDto.city,
            state: createUserDto.state,
            cep: createUserDto.cep,
        };

        return this.usersService.create(userData);
    }
}
