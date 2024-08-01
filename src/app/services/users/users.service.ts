import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../domain/users/entities/user.entity';
import * as nodemailer from 'nodemailer';
import { RegisterDto } from 'src/domain/auth/dtos/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private transporter: typeof nodemailer.createTransport;

  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<User>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: process.env.COMPANY_EMAIL_LOGIN,
        pass: process.env.COMPANY_EMAIL_PASS,
      },
    });
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async sendRecoveryEmail(email: string, token: string) {
    const mailOptions = {
      from: 'aton.bertini@outlook.com',
      to: email,
      subject: 'Recuperação de Senha',
      html: `
        <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:</p>
        <a href="http://localhost:3000/reset-password?token=${token}&email=${email}">Redefinir Senha</a>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`E-mail de recuperação enviado para ${email}`);
    } catch (error) {
      console.error('Erro ao enviar e-mail de recuperação:', error);
      throw error;
    }
  }

  async update(id, userData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error(`User with id ${id} not found.`);
    }
    Object.assign(user, userData);
    return this.userRepository.save(user);
  }
}
