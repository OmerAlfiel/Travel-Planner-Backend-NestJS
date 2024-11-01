// src/services/booking.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { BookingIntegrationService } from 'src/integrations/booking.integration';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private bookingIntegrationService: BookingIntegrationService,
  ) {}

  async create(bookingData: Partial<Booking>): Promise<Booking> {
    const booking = this.bookingRepository.create(bookingData);
    return this.bookingRepository.save(booking);
  }

  async update(id: number, updateData: Partial<Booking>): Promise<Booking> {
    await this.bookingRepository.update(id, updateData);
    return this.bookingRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async findById(id: number): Promise<Booking> {
    return this.bookingRepository.findOne({ where: { id } });
  }

  async connectToAPI(provider: string, data: any): Promise<any> {
    // Implement connection to third-party booking APIs
    return {};
  }
  async handleBookingRequest(bookingRequest: any): Promise<any> {
    const response = await this.bookingIntegrationService.searchFlights(bookingRequest);
    // Implement logic to handle booking response and confirm booking in the database
    return response;
  }
  async findByUserId(userId: number): Promise<Booking[]> {
    return this.bookingRepository.find({ where: { user: { id: userId } } });
  }
  

}