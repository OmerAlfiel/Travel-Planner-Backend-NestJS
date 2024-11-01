// src/services/auth.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { RegisterDto } from 'src/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, password, email, role } = registerDto;
    await this.checkUserExists(email);
    const hashedPassword = await this.hashPassword(password);
    return this.createUser(username, hashedPassword, email, role);
  }
  
  private async checkUserExists(email: string) {
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) throw new ConflictException('User already exists');
  }
  
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  
  private async createUser(username: string, password: string, email: string, role: string): Promise<User> {
    const user = this.usersRepository.create({ username, password, email, roles: [role] });
    return this.usersRepository.save(user);
  }
  

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
