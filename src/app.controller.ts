import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    @Render('home')
    getHome() {
        return { message: 'Bem-vindo à Home' };
    }
}
