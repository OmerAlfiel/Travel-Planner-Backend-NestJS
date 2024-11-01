// src/services/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from 'src/dto/update-user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateProfile(id: number, updateData: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateData);
    return this.findById(id);
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    // Here, you would hash the password before saving it
    return this.userRepository.save(user);
  }
}
