import { Controller, Request, Post, UseGuards, Render, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Public()
    @Post('register')
    async register(@Request() req) {
        return this.authService.register(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @Render('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
