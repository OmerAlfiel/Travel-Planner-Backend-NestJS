import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { CommunityService } from '../services/community.service';
import { Community } from '../entities/community.entity';
import { CreateCommunityDto } from '../dto/create-community.dto';

@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  async create(@Body() communityData: CreateCommunityDto): Promise<Community> {
    return this.communityService.create(communityData);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Community> {
    return this.communityService.findById(id);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Community[]> {
    return this.communityService.findAll(page, limit);
  }
}
