import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Destination } from '../entities/destination.entity';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>,
  ) {}

  async create(destinationData: Partial<Destination>): Promise<Destination> {
    const destination = this.destinationRepository.create(destinationData);
    return this.destinationRepository.save(destination);
  }

  async update(id: number, updateData: Partial<Destination>): Promise<Destination> {
    await this.destinationRepository.update(id, updateData);
    const updatedDestination = await this.findById(id);
    return updatedDestination;
  }

  async findAll(): Promise<Destination[]> {
    return this.destinationRepository.find();
  }

  async findById(id: number): Promise<Destination> {
    const destination = await this.destinationRepository.findOne({ where: { id } });
    if (!destination) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }
    return destination;
  }

  async search(query: string): Promise<Destination[]> {
    return this.destinationRepository.createQueryBuilder('destination')
      .where('destination.name LIKE :query', { query: `%${query}%` })
      .getMany();
  }
}
