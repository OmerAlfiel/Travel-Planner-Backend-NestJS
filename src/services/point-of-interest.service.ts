// src/services/point-of-interest.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointOfInterest } from '../entities/point-of-interest.entity';

@Injectable()
export class POIService {
  constructor(
    @InjectRepository(PointOfInterest)
    private poiRepository: Repository<PointOfInterest>,
  ) {}

  async create(poiData: Partial<PointOfInterest>): Promise<PointOfInterest> {
    const poi = this.poiRepository.create(poiData);
    return this.poiRepository.save(poi);
  }

  async update(id: number, updateData: Partial<PointOfInterest>): Promise<PointOfInterest> {
    await this.poiRepository.update(id, updateData);
    return this.findById(id); // Find and return the updated POI
  }

  async findAll(): Promise<PointOfInterest[]> {
    return this.poiRepository.find();
  }

  async findById(id: number): Promise<PointOfInterest> {
    const poi = await this.poiRepository.findOne({ where: { id } });
    if (!poi) {
      throw new NotFoundException(`Point of Interest with ID ${id} not found`);
    }
    return poi;
  }

  async delete(id: number): Promise<void> {
    await this.poiRepository.delete(id);
  }

  async findByPreferences(preferences: Record<string, any>): Promise<PointOfInterest[]> {
    const query = this.poiRepository.createQueryBuilder('poi');

    if (preferences.type) {
      query.andWhere('poi.type = :type', { type: preferences.type });
    }

    if (preferences.location) {
      query.andWhere('poi.location = :location', { location: preferences.location });
    }

    return query.getMany();
  }
}
