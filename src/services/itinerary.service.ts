import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Itinerary } from '../entities/itinerary.entity';
import { UserService } from './user.service';

@Injectable()
export class ItineraryService {
  constructor(
    @InjectRepository(Itinerary)
    private itineraryRepository: Repository<Itinerary>,
    private userService: UserService,
  ) {}

  async create(itineraryData: Partial<Itinerary>): Promise<Itinerary> {
    const itinerary = this.itineraryRepository.create(itineraryData);
    return this.itineraryRepository.save(itinerary);
  }

  async update(id: number, updateData: Partial<Itinerary>): Promise<Itinerary> {
    await this.itineraryRepository.update(id, updateData);
    return this.itineraryRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.itineraryRepository.delete(id);
  }

  async findAll(): Promise<Itinerary[]> {
    return this.itineraryRepository.find();
  }

  async findByUserId(userId: number): Promise<Itinerary[]> {
    return this.itineraryRepository.find({ where: { user: { id: userId } } });
  }
}
