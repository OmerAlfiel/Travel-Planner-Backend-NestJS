import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DestinationService } from '../services/destination.service';
import { Destination } from '../entities/destination.entity';
import { MapIntegrationService } from 'src/integrations/map.integration';
import { CreateDestinationDto } from '../dto/create-destination.dto';

@Controller('destinations')
export class DestinationController {
  constructor(
    private readonly destinationService: DestinationService,
    private readonly mapIntegrationService: MapIntegrationService,
  ) {}

  @Get()
  async getAll(@Query('search') search: string): Promise<Destination[]> {
    if (search) {
      return this.destinationService.search(search);
    }
    return this.destinationService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Destination> {
    return this.destinationService.findById(id);
  }

  @Get(':id/map')
  async getMap(@Param('id') id: number): Promise<any> {
    const destination = await this.destinationService.findById(id);
    return this.mapIntegrationService.getPOIs(destination.location, 5000, 'tourist_attraction');
  }

  @Post()
  async create(@Body() destinationData: CreateDestinationDto): Promise<Destination> {
    return this.destinationService.create(destinationData);
  }
}
