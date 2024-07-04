import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class PagesController {
    @Get()
    @Render('home')
    getHome() {
        return { message: 'Bem-vindo à Home' };
    }

    @Get('login')
    @Render('login')
    getLogin() {
        return { message: 'Faça login' };
    }

    @Get('register')
    @Render('register')
    getRegister() {
        return { message: 'Registre-se' };
    }

    @Get('recover')
    @Render('recover')
    getRecover() {
        return { message: 'Recuperar Senha' };
    }
}
