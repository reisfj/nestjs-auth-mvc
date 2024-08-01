import { Controller, Get, Query, Render } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

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

  @Get('reset-password')
  @Render('reset-password')
  async resetPasswordPage(@Query('token') token: string) {
    const email = await this.authService.validatePasswordResetToken(token);
    if (!email) {
      return { error: 'Token inválido ou expirado.' };
    }
    return { email, token };
  }
}
