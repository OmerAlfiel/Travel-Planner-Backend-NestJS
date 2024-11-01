// src/controllers/user.controller.ts
import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from 'src/dto/update-user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile/:id')
  async getProfile(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  @Put('profile/:id')
  async updateProfile(@Param('id') id: number, @Body() updateData: UpdateUserDto): Promise<User> {
    return this.userService.updateProfile(id, updateData);
  }
}
