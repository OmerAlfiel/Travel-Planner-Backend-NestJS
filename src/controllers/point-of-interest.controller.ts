// src/controllers/point-of-interest.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { POIService } from '../services/point-of-interest.service';
import { PointOfInterest } from '../entities/point-of-interest.entity';
import { CreatePOIDTO } from 'src/dto/create-point-of-interest.dto';


@Controller('pois')
export class POIController {
  constructor(private readonly poiService: POIService) {}

  @Get()
  async getAll(): Promise<PointOfInterest[]> {
    return this.poiService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<PointOfInterest> {
    return this.poiService.findById(id);
  }

  @Post()
  async create(@Body() poiData: CreatePOIDTO): Promise<PointOfInterest> {
    return this.poiService.create(poiData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<PointOfInterest>): Promise<PointOfInterest> {
    return this.poiService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.poiService.delete(id);
  }
}
