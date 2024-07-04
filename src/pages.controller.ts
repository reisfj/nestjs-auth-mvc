import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';

@Controller()
export class PagesController {
    @UseGuards(JwtAuthGuard)
    @Get('home')
    @Render('home')
    getHome() {
        return { message: 'Bem-vindo à Home' };
    }

    @Public()
    @Get('login')
    @Render('login')
    getLogin() {
        return { message: 'Faça login' };
    }

    @Public()
    @Get('register')
    @Render('register')
    getRegister() {
        return { message: 'Registre-se' };
    }

    @Public()
    @Get('recover')
    @Render('recover')
    getRecover() {
        return { message: 'Recuperar Senha' };
    }
}
