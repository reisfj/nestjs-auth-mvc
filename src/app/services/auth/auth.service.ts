import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from '../../../domain/auth/dtos/register.dto';
import { User } from '../../../domain/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<User> {
    return this.usersService.create(registerDto);
  }

  async sendPasswordResetEmail(email: string) {
    const token = this.generatePasswordResetToken(email);
    await this.usersService.sendRecoveryEmail(email, token);
  }

  private generatePasswordResetToken(email: string): string {
    return this.jwtService.sign({ email }, { expiresIn: '1h' });
  }

  async validatePasswordResetToken(token: string): Promise<string | null> {
    try {
      const decoded = this.jwtService.verify(token);
      if (decoded && decoded.email) {
        return decoded.email;
      }
    } catch (error) {
      console.error('Erro ao validar token de recuperação:', error);
    }
    return null;
  }

  async resetPassword(
    email: string,
    token: string,
    newPassword: string,
  ): Promise<boolean> {
    try {
      const isValidToken = await this.validatePasswordResetToken(token);
      if (!isValidToken || isValidToken !== email) {
        throw new Error('Token inválido ou expirado');
      }

      const user = await this.usersService.findOne(email);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      user.password = hashedPassword;
      await this.usersService.update(user.id, user);

      return true;
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return false;
    }
  }
}
