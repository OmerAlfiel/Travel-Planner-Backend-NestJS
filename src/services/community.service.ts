import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Community } from '../entities/community.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
  ) {}

  async create(communityData: Partial<Community>): Promise<Community> {
    const community = this.communityRepository.create(communityData);
    return this.communityRepository.save(community);
  }

  async update(id: number, updateData: Partial<Community>): Promise<Community> {
    await this.communityRepository.update(id, updateData);
    return this.findById(id); // Updated to use the findById method
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Community[]> {
    return this.communityRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findById(id: number): Promise<Community> {
    const community = await this.communityRepository.findOne({ where: { id } });
    if (!community) {
      throw new NotFoundException(`Community with ID ${id} not found`);
    }
    return community;
  }

  async notifyNewMessage(communityId: number, message: string): Promise<void> {
    // Implement notification logic for new messages
    console.log(`New message in community ${communityId}: ${message}`);
  }
}
