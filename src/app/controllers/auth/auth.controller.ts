import {
  Controller,
  Post,
  UseGuards,
  Render,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { Public } from '../../decorators/public.decorator';
import { RegisterDto } from '../../../domain/auth/dtos/register.dto';
import { RecoverDto } from '../../../domain/auth/dtos/recover.dto';
import { ResetPasswordDto } from '../../../domain/auth/dtos/reset-password.dto';
import { LoginDto } from '../../../domain/auth/dtos/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    const user = await this.authService.validateUser(
      LoginDto.email,
      LoginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('invalid input');
    }
    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('recover')
  async recover(@Body() recoverDto: RecoverDto) {
    return this.authService.sendPasswordResetEmail(recoverDto.email);
  }

  @Public()
  @Post('reset-password')
  @Render('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { email, token, password } = resetPasswordDto;
    const result = await this.authService.resetPassword(email, token, password);
    return { success: result };
  }
}
