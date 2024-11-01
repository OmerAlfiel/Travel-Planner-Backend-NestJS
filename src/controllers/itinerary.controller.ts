import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ItineraryService } from '../services/itinerary.service';
import { Itinerary } from '../entities/itinerary.entity';
import { CreateItineraryDto } from '../dto/create-itinerary.dto';

@Controller('itineraries')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Post()
  async create(@Body() itineraryData: CreateItineraryDto): Promise<Itinerary> {
    return this.itineraryService.create(itineraryData);
  }

  @Get(':userId')
  async getByUserId(@Param('userId') userId: number): Promise<Itinerary[]> {
    return this.itineraryService.findByUserId(userId); // Now filters by userId
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.itineraryService.delete(id);
  }
}
